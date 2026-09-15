---
title: Lifecycle — An Organization That Grows Through Six Stages
---

# So you don't solve the same problem from scratch twice

How the third principle in [Philosophy](/en/philosophy), "the organization must keep growing,"
actually plays out shows up as a cycle that loops through six stages.

## The six stages

1. **Recruitment** — if a needed capability doesn't exist, a new role is created. But it isn't
   added carelessly just because creating one is easy — first we check whether an existing role
   can absorb it, whether it stays within the [depth-2 pyramid](/en/organization-model), and
   whether the reason is concrete.
2. **Assignment** — the new role is given a clear role and responsibility.
3. **Collaboration** — an execution graph is assembled to carry out the work. Whatever roles are
   needed collaborate freely.
4. **Reporting** — every task's results are reported to the accountable owner. The reporting
   structure follows the org chart exactly.
5. **Feedback** — review and feedback are the organization's learning process, feeding back into
   how future work is done and into knowledge assets.
6. **Knowledge Accumulation** — newly gained experience accumulates as knowledge assets such as
   Workflow / Capability / Framework / Portfolio entries. That way, a different department facing
   a similar problem later doesn't have to solve it from scratch again.

The sixth stage loops back into the first — accumulated knowledge becomes the basis for the next
recruitment decision (can an existing role absorb this?).

<figure>
<svg viewBox="0 0 420 340" role="img" aria-label="A cycle where Recruitment, Assignment, Collaboration, Reporting, Feedback, and Knowledge Accumulation follow in order, and Knowledge Accumulation loops back into Recruitment">
  <defs>
    <marker id="arrow-lc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>

  <line x1="242.9" y1="69" x2="281" y2="91" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-lc)" />
  <line x1="313.9" y1="148" x2="313.9" y2="192" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-lc)" />
  <line x1="281" y1="249" x2="242.9" y2="271" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-lc)" />
  <line x1="177.1" y1="271" x2="139" y2="249" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-lc)" />
  <line x1="106.1" y1="192" x2="106.1" y2="148" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-lc)" />
  <line x1="139" y1="91" x2="177.1" y2="69" stroke="#c1652a" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#arrow-lc)" />

  <circle cx="210" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="210" y="46" text-anchor="middle" font-size="11" font-weight="600">1. Recruit-</text>
  <text x="210" y="60" text-anchor="middle" font-size="9" opacity="0.7">ment</text>

  <circle cx="313.9" cy="110" r="38" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="313.9" y="106" text-anchor="middle" font-size="11" font-weight="600">2. Assign-</text>
  <text x="313.9" y="120" text-anchor="middle" font-size="9" opacity="0.7">ment</text>

  <circle cx="313.9" cy="230" r="38" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="313.9" y="226" text-anchor="middle" font-size="11" font-weight="600">3. Collab-</text>
  <text x="313.9" y="240" text-anchor="middle" font-size="9" opacity="0.7">oration</text>

  <circle cx="210" cy="290" r="38" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="210" y="286" text-anchor="middle" font-size="11" font-weight="600">4. Report-</text>
  <text x="210" y="300" text-anchor="middle" font-size="9" opacity="0.7">ing</text>

  <circle cx="106.1" cy="230" r="38" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="106.1" y="226" text-anchor="middle" font-size="11" font-weight="600">5. Feed-</text>
  <text x="106.1" y="240" text-anchor="middle" font-size="9" opacity="0.7">back</text>

  <circle cx="106.1" cy="110" r="38" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="106.1" y="103" text-anchor="middle" font-size="11" font-weight="600">6. Knowl-</text>
  <text x="106.1" y="116" text-anchor="middle" font-size="11" font-weight="600">edge</text>
  <text x="106.1" y="129" text-anchor="middle" font-size="9" opacity="0.7">Accum.</text>
</svg>
<figcaption>The six stages follow in order, and experience accumulated in Knowledge Accumulation
(6) becomes the basis for the next Recruitment (1) decision, closing the loop (dashed).</figcaption>
</figure>

::: info Revisiting the decision — why we didn't pre-draw a "list of roles"
**Problem.** A common temptation when first designing an organization is to draw up the org chart
in advance — "what roles will this project need?" But the actual operator's work spans embedded
software and firmware simulation tooling all the way to general software engineering, plus
CI/CD, automation, and service development, across a roughly 500-person organization — no single
domain could represent the whole scope.

**Investigation.** We considered what would happen if we picked a domain in advance and designed
roles around it. The decision record's conclusion is clear — *"Pre-picking a domain would have
overfit Phase 1 to a guess, contradicting §4.1 itself"*. A structure built in advance would only
become debt the operator would later have to unwind.
(Source: `knowledge/decisions/2026-07-07-recruit-on-demand-phase-1.md`)

**Resolution.** `instance/roles/` started out **empty** on purpose. Roles are only created when
actual Operator-mode work exposes a real gap in the organization's capability — there's no
top-down, domain-by-domain pre-design.

**The strength that followed.** The capability catalog grows from what actually happened, not
from guesswork. And this principle itself has the effect of validating the recruitment cycle
(Lifecycle) in the field rather than as a diagramming exercise — every role on this site
(frontend-engineer, devops-engineer, and so on) actually came into being exactly that way.
:::

## The life of a single department

These six stages are a cycle the whole organization keeps turning, and within that cycle each
department (project) has its own separate life — `draft → active → ended → closed`.

- **draft** — the stage of casually talking things through and refining a request while it's
  still unclear.
- **active** — once the user clearly approves, actual delegation begins.
- **ended** — reached when the user instructs that the work is complete.
- **closed** — fully closes only after the knowledge-accumulation review (writing a retrospective,
  assessing reusability) is done.

<figure>
<svg viewBox="0 0 560 100" role="img" aria-label="The flow of a single department's life, going from draft through active and ended to closed">
  <defs>
    <marker id="arrow-life" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>
  <rect x="10" y="30" width="110" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="65" y="55" text-anchor="middle" font-size="12">draft</text>
  <line x1="120" y1="50" x2="150" y2="50" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-life)" />

  <rect x="150" y="30" width="110" height="40" rx="6" fill="none" stroke="#c1652a" stroke-width="2" />
  <text x="205" y="55" text-anchor="middle" font-size="12" fill="#c1652a">active</text>
  <line x1="260" y1="50" x2="290" y2="50" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-life)" />

  <rect x="290" y="30" width="110" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="345" y="55" text-anchor="middle" font-size="12">ended</text>
  <line x1="400" y1="50" x2="430" y2="50" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow-life)" />

  <rect x="430" y="30" width="110" height="40" rx="6" fill="none" stroke="currentColor" stroke-width="1.5" />
  <text x="485" y="55" text-anchor="middle" font-size="12">closed</text>
</svg>
<figcaption>A department (project) starts at draft, becomes active with user approval, moves to
ended on a completion instruction, and becomes closed once the knowledge-accumulation review is
done.</figcaption>
</figure>

::: info Revisiting the decision — the department wasn't renamed, its meaning changed
**Problem.** Two frictions showed up in practice. One was orchestrators tending to skip the
designated reporting chain and contact members directly; the other was the constraint that the
organization could only handle one task per department at a time — which ran head-on into this
org's own principle (§2.5/§7) that AI can work in parallel.

**Investigation.** The first proposed fix was "just rename the department to a project." That
proposal was immediately challenged — §10.7/§10.8 already allowed departments to be dissolved
(termination, reorganization), so "permanence" was never actually an intrinsic property of a
"department" to begin with. The decision record puts the real distinction this way —
*"under the old model, ending a department was 조직개편 [reorganization] — exceptional,
user-approval-gated... Under the new model, a department's end is the expected, routine outcome
of its task finishing"*.
(Source: `knowledge/decisions/2026-07-09-department-is-project-scoped-not-renamed.md`)

**Resolution.** The name "department" and the §10.2 rule stayed exactly as they were — only
**what it means to exist as a department** changed. A department forms the moment some
role-class actually needs to execute, and dissolves automatically once the work is done — this
forming and dissolving is never a reorganization. Instead, **reorganization was redefined to
target the role-class catalog, not the department** (merging, splitting, reclassifying, or
retiring entries in `instance/roles/*.yaml`). The very concept of "merging two departments"
disappeared — because a department was never a permanent unit to begin with.

**The strength that followed.** Once departments became temporary and the fixed head/staff
distinction tied to role-classes disappeared, the original complaint — "the orchestrator skips
the reporting chain" — resolved itself naturally, with no separate department/staff directory
split needed. The property that a department's PM is the sole interface to the Ops-staff is now
enforced not by directory structure but by **the call-nesting structure itself**.
:::

## Quick guide

**In one sentence.** The organization keeps cycling through six stages
(Recruitment→Assignment→Collaboration→Reporting→Feedback→Knowledge Accumulation), and within that
cycle, each department is a **disposable container** that forms when needed and vanishes
automatically once its work is done.

**To check this page for yourself**

1. Read the "Phase 1 stance: recruit-on-demand" section of `schema/README.md` directly and see
   how it distinguishes "recruitment" from "department formation" as two separate events.
2. You can check, in any department, that the `status:` field at the top of
   `instance/workspace/<project>/project-record.md` is actually one of
   `draft`/`active`/`ended`/`closed`.
3. This site's own department (`aise-org-site`) follows the exact same format — the department
   writing this very page is no exception.

**Next.** How collaboration is actually assembled within a department and across departments →
[Collaboration Model](/en/collaboration-model).

*Source: `CONSTITUTION.md` §4, `schema/README.md` "Department lifecycle" · "Phase 1 stance:
recruit-on-demand"; `knowledge/decisions/2026-07-07-recruit-on-demand-phase-1.md`,
`knowledge/decisions/2026-07-09-department-is-project-scoped-not-renamed.md`.*
