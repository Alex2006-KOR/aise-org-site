---
title: 5. How it is kept — governance, policy files, hooks
---

# 5. How it is kept

::: lead
Rules are kept in three layers. The constitution sets the principles, governance sets the operating policy, and the adapter's hooks enforce only what must hold.
:::

## Three layers of rules {#layers}

aise-core's rules are split into three layers. The constitution (`CONSTITUTION.md`) sets why the organization exists,
its principles and its shape. Governance (`governance/`) turns those principles into operating policy. The adapter
(`adapters/<tool>/`) implements, with that tool's own mechanisms, the parts of the policy the tool itself must check or
block. The top two layers contain no tool's syntax. Everything bound to a tool is in the adapter.

<figure>
<svg viewBox="0 0 560 300" role="img" aria-label="Three layers. The constitution at the top holds the reason for existing, the principles and the shape of the organization. Governance in the middle holds the mode, records, duplication, adapter, asset and secrets policies. The adapter at the bottom holds hooks, commands and agent definitions. The top two layers are tool-neutral; there is one bottom layer per tool">
  <defs>
    <marker id="kp-arrow-en" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>
  <rect x="20" y="15" width="380" height="70" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="36" y="42" font-size="14" font-weight="600">Constitution — CONSTITUTION.md</text>
  <text x="36" y="66" font-size="12">Why it exists · principles · shape</text>
  <line x1="210" y1="85" x2="210" y2="110" stroke="currentColor" stroke-width="1.5" marker-end="url(#kp-arrow-en)" />
  <text x="222" y="102" font-size="11" opacity="0.8">made concrete</text>
  <rect x="20" y="113" width="380" height="70" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="36" y="140" font-size="14" font-weight="600">Governance — governance/</text>
  <text x="36" y="164" font-size="12">Mode · records · duplication · adapter · asset · secrets</text>
  <line x1="210" y1="183" x2="210" y2="208" stroke="#c1652a" stroke-width="1.5" marker-end="url(#kp-arrow-en)" />
  <text x="222" y="200" font-size="11" fill="#c1652a">only what is enforced</text>
  <rect x="20" y="211" width="380" height="70" rx="8" fill="none" stroke="#c1652a" stroke-width="2" />
  <text x="36" y="238" font-size="14" font-weight="600" fill="#c1652a">Adapter — adapters/&lt;tool&gt;/</text>
  <text x="36" y="262" font-size="12" fill="#c1652a">Hooks · commands · agent definitions</text>
  <line x1="420" y1="20" x2="420" y2="180" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" />
  <text x="432" y="92" font-size="12" font-weight="600">Tool-neutral</text>
  <text x="432" y="112" font-size="11" opacity="0.8">every tool reads</text>
  <text x="432" y="128" font-size="11" opacity="0.8">the same documents</text>
  <line x1="420" y1="214" x2="420" y2="278" stroke="#c1652a" stroke-width="1" stroke-dasharray="3 4" />
  <text x="432" y="240" font-size="12" font-weight="600" fill="#c1652a">One per tool</text>
  <text x="432" y="260" font-size="11" fill="#c1652a">now Claude Code</text>
</svg>
<figcaption>Figure 5-1. The three layers of rules. Higher layers change rarely; lower layers sit closer to the tool.</figcaption>
</figure>

::: point In detail — why the layers are split
**Background.** Hooks, slash commands and subagent-definition formats all differ from tool to tool. Mixed into the rule
documents, they force the rules to be rewritten whenever the tool changes.

**Problem.** The organization's philosophy and way of working must survive a change of tool. Rules written in one tool's
syntax cannot meet that requirement.

**Solution.** One test decides: "would it change, or stop working, if the tool were swapped?" If so, it belongs in the
adapter; if not, in the constitution or governance. When the answer is unclear, the operator is asked before anything
is built — and that check-in happens for every tool-specific mechanism.

<Cite ids="standing-core-neutral,adapter-test" />
:::

## How governance is composed {#governance}

`governance/` holds policy documents for people and lists read by programs. Most of it is portable policy, the same in
every deployment. Policy that reflects this organization's own circumstances, such as its tool constraints, is marked as
such. All of governance can be changed only in Meta mode.

<figure>
<svg viewBox="0 0 560 360" role="img" aria-label="Governance on two axes. Across: policy documents for people and lists read by programs. Down: portable policy and policy for this deployment only. Portable documents: STANDING_RULES, MODE_POLICY, CONTINUITY_POLICY, DUPLICATION_POLICY, ADAPTER_POLICY, SECRETS_POLICY, DEPLOYMENT_READINESS. Portable list: adapter_requirements.yaml. This deployment's document: ASSET_POLICY. This deployment's list: asset_command_patterns.yaml">
  <text x="225" y="22" text-anchor="middle" font-size="13" font-weight="600">Policy documents (people)</text>
  <text x="491" y="22" text-anchor="middle" font-size="13" font-weight="600">Lists (programs)</text>
  <text x="14" y="140" font-size="12" font-weight="600" transform="rotate(-90 14 140)" text-anchor="middle">Portable</text>
  <text x="14" y="302" font-size="12" font-weight="600" transform="rotate(-90 14 302)" text-anchor="middle" fill="#c1652a">This org only</text>
  <rect x="30" y="34" width="390" height="210" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="46" y="62" font-size="13">STANDING_RULES — standing rules</text>
  <text x="46" y="88" font-size="13">MODE_POLICY — two modes, write limits</text>
  <text x="46" y="114" font-size="13">CONTINUITY_POLICY — records, carrying on</text>
  <text x="46" y="140" font-size="13">DUPLICATION_POLICY — one place per fact</text>
  <text x="46" y="166" font-size="13">ADAPTER_POLICY — what is tool-specific</text>
  <text x="46" y="192" font-size="13">SECRETS_POLICY — credentials</text>
  <text x="46" y="218" font-size="13">DEPLOYMENT_READINESS — pre-release checks</text>
  <rect x="432" y="34" width="118" height="210" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="491" y="130" text-anchor="middle" font-size="12">adapter_</text>
  <text x="491" y="148" text-anchor="middle" font-size="12">requirements</text>
  <text x="491" y="166" text-anchor="middle" font-size="12">.yaml</text>
  <rect x="30" y="256" width="390" height="92" rx="8" fill="none" stroke="#c1652a" stroke-width="2" />
  <text x="46" y="307" font-size="13" fill="#c1652a">ASSET_POLICY — this organization's tool limits</text>
  <rect x="432" y="256" width="118" height="92" rx="8" fill="none" stroke="#c1652a" stroke-width="2" />
  <text x="491" y="297" text-anchor="middle" font-size="12" fill="#c1652a">asset_command_</text>
  <text x="491" y="315" text-anchor="middle" font-size="12" fill="#c1652a">patterns.yaml</text>
</svg>
<figcaption>Figure 5-2. What governance is made of. Another organization using aise-core rewrites only the bottom row (orange) for its own circumstances.</figcaption>
</figure>

| File | What it holds |
|---|---|
| `STANDING_RULES.md` | Standing rules for building and running the organization: git discipline, a check-in before every tool-specific feature, a tool-neutral core, OCP first, behavior reproducible from the repository alone, cite a fact instead of restating it |
| `MODE_POLICY.md` | Operator mode (working through the organization) versus Meta mode (changing the organization itself), which paths each may write, mode declaration |
| `CONTINUITY_POLICY.md` | The record to leave before context is lost (handoff), and where each kind of record lives |
| `DUPLICATION_POLICY.md` | Five shapes a fact takes when several documents state it, and how to handle each |
| `ADAPTER_POLICY.md` | How to tell what is tool-specific, what an adapter must provide, how an adapter is checked |
| `SECRETS_POLICY.md` | Credentials: the need is recorded, the value stays outside the repository |
| `DEPLOYMENT_READINESS.md` | What to check when leaving the development phase for deployment |
| `ASSET_POLICY.md` | This organization's tool constraints: no external MCP servers, no tools with exfiltration risk, the same review for skills |
| `adapter_requirements.yaml` | The requirements an adapter must provide, written without any tool's name |
| `asset_command_patterns.yaml` | Command conditions attached to approved tools, e.g. no arbitrary external network calls, no force-push and no direct push to a protected branch |

<Cite ids="mode-policy,asset-policy" />

::: point In detail — why documents and lists are separate (background · problem · solution)
**Background.** The same condition was written into several documents separately. One audit found a single push
condition restated in six files, two of them describing an old policy the enforcement code no longer implemented.

**Problem.** A value restated in prose is not connected to the value actually enforced. When it changes, the mismatch
stays hidden until someone re-reads every document.

**Solution.** A value a program enforces lives in one machine-read list. Documents cite the file instead of restating
the value. Hooks read the same list. The command conditions, for instance, exist only in `asset_command_patterns.yaml`;
the hook and the role definitions both take them from that file.

<Cite ids="duplication-policy,asset-patterns" />
:::

## From policy to adapter {#requirements}

The parts of a policy that the tool itself must check, block, remind, record or answer are written as requirements in
`adapter_requirements.yaml`. Each requirement has a kind and a priority. The adapter answers each one in
`conformance.yaml`: whether it is built, and which files implement it. `adapter_check.py` compares the two lists in both
directions.

<figure>

```mermaid
flowchart LR
  P["Policy document<br/>MODE_POLICY<br/>protected paths:<br/>Meta mode only"] --> R["Requirement<br/>mode-boundary<br/>gate · first-run"]
  R --> C["The adapter's answer<br/>conformance.yaml<br/>built + implementation file"]
  C --> H["Hook<br/>blocks just before a write"]
  K{{"adapter_check.py"}} -.->|"checks both ways"| R
  K -.-> C
```

<figcaption>Figure 5-3. How one policy comes to be enforced. The protected-path rule becomes the requirement <code>mode-boundary</code>; the Claude Code adapter implements it as a hook that runs just before a write.</figcaption>
</figure>

| Kind | What it does |
|---|---|
| Gate | Stops an action before it happens; without it the rule is broken |
| Observer | Notices, and tells or records; never blocks |
| Lifecycle | Happens by itself at a defined moment (mode entry, an edit, a delegation) |
| Entry | A command the operator or a session runs (mode declaration, handoff) |
| Query | A question the tool must answer at run time (model tiers, a delegation's activity, context use, token use) |
| Binding | Maps a core concept to a tool mechanism |

There are two priorities. **First-run** items are ones without which running the organization on that tool is not safe.
**Later** items are built when a real need appears — never in advance.

<Cite ids="adapter-requirements,adapter-conformance" />

::: point In detail — why a separate requirements list (background · problem · solution)
**Background.** Each new rule tends to bring something the tool must do. Some rules must block; others only need to tell.

**Problem.** If enforcement is tracked only inside an adapter, a rule can spread enforced on one tool and silently absent
on another. With no single list of what must be provided, there is also no list of what a new tool's adapter would have
to replace.

**Solution.** A requirements list written without any tool's vocabulary is the single source. When a rule comes to need
the tool, the requirement and the adapter's answer are added in the same change. The check fails in both directions: a
requirement the adapter has not answered, and an implementation file that serves no requirement. When aise-core is first
opened in a new tool, this check runs first; if first-run items are missing, building them is proposed before any other
work.

<Cite ids="adapter-requirements,agents-md" />
:::

## Hooks: only what must hold {#hooks}

A hook is a script the tool runs just before or after a given action. aise-core enforces with hooks only the few
points that truly must hold, and leaves the rest to the model's judgment. Writing to a protected path in the wrong mode,
a command that breaks a condition attached to an approved tool, and a delegation that bypasses a role's definition are
such points.

The hooks run as one engine. The tool calls one hook per event; the engine runs the checks registered for that event and tool in a fixed
order and merges their results. Checks are of two kinds: a **gate** may block or ask a person, an **observer** may only note or warn. Policy
values, such as who may write which path, are read from governance's lists, not from code.

<figure>

```mermaid
flowchart LR
  T["Tool call<br/>Edit · Write · Bash · Agent …"] --> E["Hook engine<br/>one entry point per event"]
  P[("Policy lists<br/>write_policy.yaml<br/>asset_command_patterns.yaml")] -.-> E
  E --> G["Gates<br/>write boundaries · command conditions<br/>role delegation · role deletion<br/>settings protection"]
  E --> O["Observers<br/>context warning · working trees<br/>record reminders"]
  G -->|"deny > ask > allow"| D{"Decision"}
  O -->|"notes only"| D
  E -.->|"if a check fails,<br/>write-capable calls are denied"| D
```

<figcaption>Figure 5-4. How the hooks are composed. Check results merge into one (deny over ask, ask over allow), and a gate that cannot run denies any write-capable call. The only way to switch this off is the operator changing a setting by hand.</figcaption>
</figure>

<Cite ids="hook-engine" />


::: point In detail — a written ban, broken the next day (background · problem · solution)
**Background.** The PM's role definition contained the sentence "do not replace a role with a role-play prompt to a
general-purpose agent".

**Problem.** The day after that sentence went in, a department's PM handed all five slices of its run to general-purpose
agents rather than approved roles. The run's record said approved roles had been used. It was found a few days later,
while looking at subagent metadata with a tool that reconstructs the delegation structure.

**Solution.** No more prose was written: the prose was already there, so adding more was not a reliable fix. A
delegation-check hook that had been built but not wired in was wired in. Before that, it was tested against the real
incident's prompt, and its first pattern did not catch it. The prompt had the shape "You are the backend-engineer of the
(department name and description) department", with 81 characters between "You are" and the role name. The pattern was
widened, the real prompt added as regression test data, and the hook driven end to end with real tool-call payloads to
confirm that the incident is blocked and a proper delegation passes. Only then was it wired in.

<Cite ids="hooks-delegation" />
:::

::: point In detail — the operator sets policy; Claude Code proposes the implementation
The operator sets policy and chooses among options. How to implement it, and why a hook is needed at that point, is
proposed by Claude Code.

The approval gate for changing an existing role file is an example.

- It was not built until a real change came up; there was nothing to test it against.
- It was built when a real case appeared.
- A proposal to add a new command as the approval signal was rejected: declaring a mode and a one-off approval belong to
  different interface layers, in the operator's judgment. A hook that asks the human directly was chosen instead.
- When code of the same shape appeared for the third time, it was extracted into a shared module.

Later, when the concept of "reorganization" was retired, the gate's target changed too.

<Cite ids="hooks-reorg,operator-policy" />
:::

::: point Details — no scaffolding around a gate (background · problem · solution)
**Background.** Once roles became classes shared across departments, a tool grant one department needed would follow the class into every
department that later used it. The question "can this role be barred from just this folder?" came up too.

**Problem.** A per-department permission file was considered. The same asset staff would fill it with the same judgment, so safety would not
increase. Folder-level blocking by an application-layer hook would only be best-effort.

**Solution.** No new mechanism; the line the judgment must draw was written down instead. Coarse capability approval ("may this tool be used at
all?") is what grants cover; fine scope and credentials are not a grant's business, and such requests are read as a sign that a catalog entry is
too coarse. If a stronger boundary is needed, it is built at the OS or infrastructure layer. Adding scaffolding around a gate that already cannot
be skipped does not make the judgment behind it any sharper.

<Cite ids="grant-scope,folder-access" />
:::

<SourceTable />

**Next.** → [6. Operation](/en/story/operation)
