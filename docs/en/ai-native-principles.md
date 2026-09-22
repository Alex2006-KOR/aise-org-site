---
title: AI-Native Principles — Things AI Doesn't Have to Give Up
---

# Things AI doesn't have to give up

::: tip Where you are — Background & Philosophy (3/3)
The last page in the [Background & Philosophy](/en/background) category. If
[What the usual way does differently](/en/real-world-vs-aise) laid out the differences across
seven axes, this page collects only **the ones that became possible because AI isn't a person.**
That distinction matters because it's easy to over-generalize things that should never be carried
back into a human organization. This closes out the "why"; the next category,
[How It Works](/en/how-it-works), moves on to the "how."
:::

Keeping the principles of a human organization is one thing; inheriting the limits of a human
organization along with it is another. AISE refuses the latter — the following capabilities are
not restricted just because it's AI. They're actively used instead.

- **Parallel collaboration** — several roles handle different work at the same time. There's no
  need to wait in sequence.
- **Dynamic team formation** — a team forms the moment it's needed and disperses when it's no
  longer needed.
- **Subagent use** — a large task is broken up and temporarily delegated, and only the results
  are collected once it's done.
- **Real-time knowledge sharing** — what one role has learned can be referenced by another role
  immediately.
- **Continuous organizational learning** — the six-stage cycle from [Lifecycle](/en/lifecycle)
  never stops.
- **Persistence of organizational memory** — the Project Record survives after a session ends, so
  the next session can pick it up (see [Home](/en/)).
- **Independence from AI tools** — the organization's identity isn't tied to any particular model
  or tool. Tools can change; the organization's philosophy and operating principles don't.

This list isn't just a declaration. There were several moments during design where the habit of
"a human organization would have done it this way" had to be dropped.

::: info Revisiting the decision — why "roles" don't get a personnel file
**Problem.** What happens when the same role (say, "market-researcher") is needed in several
departments at once? The first answer that came to mind was the intuition straight out of a human
organization — a "talent pool" model that splits a reusable role **type** (class) from an
**individual** (instance) that's tied to a department, accumulates experience, and gets
reassigned.

**Investigation.** We tested this instance concept against how execution actually works (this
deployment's adapter, Claude Code) — a subagent invocation is always a fresh execution of the
class definition, and aside from explicitly continuing a live execution within the same session,
nothing persists between calls. The execution substrate itself has no mechanism to keep an
"instance that's waiting to be assigned but still remembers." Modeling instances anyway would have
required inventing new bookkeeping (waiting/assigned status, pool management) just to simulate a
persistent identity the execution substrate never actually gives you.
(Source: `knowledge/decisions/2026-07-09-role-is-a-class-not-an-instance.md`)

**Resolution.** `instance/roles/<id>.yaml` defines only a **class** — no department affiliation,
no persistent individual, no memory that isn't recorded in a durable artifact. Instead,
"experience" doesn't stay tied to any one class's identity — it accumulates as insight entries
from `instance/retrospectives/` into `portfolio/`, available afterward to that class or any other.

**The strength that followed.** As the decision record puts it — *"An abstraction that doesn't
correspond to any real, persisted state in the execution substrate is exactly the kind of
complexity ... this org didn't actually have"*. The concurrency problem disappears entirely —
nothing is ever "checked out," so any number of departments can use the same class at once.
Recruiting a new class is a one-time act, but any already-recruited class being used by a new
department is always free, with no approval step — this is the point where [Lifecycle](/en/lifecycle)'s
reuse-first principle actually gets teeth at the class level. The frontend-engineer and
devops-engineer that built this site are themselves a case of reusing classes already in use by
another department (`llm-wiki-platform`).
:::

The principle of AI tool independence was itself once drawn incorrectly and later corrected — and
what makes that story interesting is that the mistake was caught by actually testing it.

::: info Revisiting the decision — how "model" fell off the provisioning list, then came back under a different label
**Problem.** The original constitution and the three staff documents listed four things the
Asset-staff provisions: "tools, MCP, model, and skills." But working out what "choosing a model"
actually means raised a question — model selection happens through the AI tool's own UI or
settings (e.g., Claude Code's `/model` command), not something any actor inside AISE could
"decide and execute."

**Investigation.** Rather than guess in words, we checked directly — testing whether the
currently running session had any tool available to change its own model, and it turned out
**it did not.** The closest capability was specifying a model for a newly spawned subagent
(the `Agent` tool's `model` parameter), and that turned out to be a completely different act.
This distinction would matter again later.
(Source: `knowledge/decisions/2026-07-08-model-is-not-a-provisioned-asset.md`)

**Resolution (first pass).** "Model" was removed entirely from the provisioning category list —
not just deprioritized, but judged to have been a **category error** to include in the first
place. The decision record states plainly — *"no actor inside AISE, including the AI running it,
has a way to act on it"*.

**But that exception later came back.** "Specifying a model for a newly spawned subagent" was
still a real, existing lever, and it was later confirmed (2026-09-08) that this is a **managing
act, not provisioning** — the delegating party (Ops-staff→PM, PM→role) choosing that slice's
model tier at the moment of delegation, as part of the execution-graph-assembly authority it
already had, not an asset the Asset-staff approves. This was directly verified in a real
session — confirming, from actual transcripts, that a subagent's model is fixed at spawn time
and cannot be changed mid-execution by itself, and that a specified model does carry through
correctly even in nested delegation (PM→role).
(Source: `knowledge/decisions/2026-09-08-model-tier-selection-delegated.md`)

**The strength that followed.** The later decision record summarizes the principle this way —
*"Never mid-run, never by downgrading the PM"*. The two judgments don't contradict each other —
"the model is not an asset provisioned by the Asset-staff" still holds, while a more precise
distinction was added: "choosing the model tier at the point of delegation is a managing act."
We avoided mistaking something impossible to execute for provisioning, without missing a lever
that genuinely does exist. The organization applies this judgment as-is whenever a PM delegates
to a member — the default is baseline, and departing from it requires leaving a one-line
justification.
:::

## Quick guide

**In one sentence.** AISE doesn't uncritically inherit the habits of a human organization (fixed
headcount, sequential processing, tool lock-in) — it only sets something as a principle after
actually testing "is this really possible on this execution substrate."

**To check this page for yourself**

1. Open any `instance/roles/*.yaml` file and confirm there's no field for department affiliation
   or assignment status — only a class definition.
2. Search `CONSTITUTION.md` for the word "model" and confirm it no longer appears in the
   provisioning category lists (§10.3, §10.9).
3. Read the `authority` field of `schema/roles/project-manager.template.yaml` for the full rule
   on how a PM chooses model tier at the point of delegation.

**Next.** That's the "why" done. Now, what shape of organization these principles actually
hardened into → [How It Works](/en/how-it-works). If you'd rather see how they hold up at the
structural level, you can jump ahead to
[Structural Principles / OCP](/en/structural-principles-ocp).

*Source: `CONSTITUTION.md` §7; `knowledge/decisions/2026-07-09-role-is-a-class-not-an-instance.md`,
`knowledge/decisions/2026-07-08-model-is-not-a-provisioned-asset.md`,
`knowledge/decisions/2026-09-08-model-tier-selection-delegated.md`.*
