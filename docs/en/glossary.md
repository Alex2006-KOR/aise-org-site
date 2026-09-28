---
title: Glossary — All the Terms Used Here, in One Place
---

# All the terms used here, in one place

::: tip Where you are — Reference
This page isn't part of the narrative; it's **reference material.** There's no need to read it in
order — drop in whenever an unfamiliar term shows up on another page. To get back to the overall
flow → the category map on [Home](/en/).
:::

Here's a collection of the terms used throughout this site. They follow one notation rule — **the
name outside the parentheses is the one AISE's own documents and code actually use; the text inside
is what it means in plain words.** For example, `OP_ORCHESTRATOR` (Ops-staff) means the role this
site calls "Ops-staff" actually exists as the document `schema/OP_ORCHESTRATOR.md`. In the body
text, each page uses this form only the first time a term appears, and the plain word after that.

**The members of the organization**

- **department** — a unit made up of a `project-manager` and members, accountable for one piece of
  work. It can be permanent, or a project formed and dissolved around a specific task. Each
  department's records live under `instance/workspace/<project-id>/`.
- **`project-manager` (PM, the manager who runs a department)** — breaks down and distributes a
  department's work, and represents the department to Ops-staff. A line role in the
  [depth-2 pyramid](/en/organization-model).
- **project member (a department member)** — an expert role with single responsibility (SRP) over
  one domain, e.g. `backend-engineer`, `frontend-engineer`, `devops-engineer`.
- **`OP_ORCHESTRATOR` (Ops-staff)** — takes the user's instructions, sets up departments, and
  assembles collaboration between them. It *is* the top-level session that declared `/aise:op`. See
  [Staff & Governance](/en/staff-governance).
- **`HR_ORCHESTRATOR` (HR-staff)** — handles recruitment and reorganization, and nothing else.
- **`AS_ORCHESTRATOR` (Asset-staff)** — approves what each role may use (provisioning).
- **`MG_ORCHESTRATOR` (Management-staff)** — works on the design of the organization itself in Meta
  mode. It *is* the top-level session that declared `/aise:meta`.

**Structure and rules**

- **role-class (a reusable job description)** — a reusable role definition registered in the
  catalog (`instance/roles/<id>.yaml`). When it joins a real department, that department's own
  domain profile is added on top.
- **`reuse_tier` (how widely a role-class can be reused)** — `schema-mandated` /
  `generic-technical` / `domain-specific`.
- **provisioning (company-approved tools)** — the scope of tools, MCP servers, and skills a role can
  actually use. Approved by Asset-staff.
- **organization chart / execution graph (who does what, when)** — see
  [Organization Model](/en/organization-model).
- **`draft` / `active` / `ended` / `closed` (being set up / running / finished / archived)** — a
  department's lifecycle status. See [Lifecycle](/en/lifecycle).

**Modes and commands**

- **Operator mode / Meta mode (using the organization / changing the organization itself)** — see
  [Operator vs Meta Mode](/en/operator-vs-meta-mode).
- **`/aise:op` · `/aise:meta` (declare a mode)** · **`/aise:handoff` (write a continuity record now)**
  · **`/aise:usage` (see a session's token usage and execution graph)** — what to actually type, in
  order, is in the [Quick Guide](/en/quick-guide); why it's split this way is in
  [How to hand work to this org](/en/usage).

**Records and continuity**

- **Project Record (the department's record files)** — the PM's detailed continuity memory
  (`project-record.md`), the inbox of not-yet-absorbed instructions Ops-staff leaves
  (`directive.md`), and the lightweight report to Ops-staff (`execution.md`). Each file has exactly
  one writer; the story of how they got split is in [Carrying on across sessions](/en/handoff).
  (The third file was first created as `report.md` on 2026-08-26, then renamed `execution.md` two
  days later after colliding with the execution tool's filename guard.)
- **run (one execution of a PM)** — a department exists across many independent runs, and those
  runs share no memory — each one bootstraps again from the three files above.
- **Ledger (an append-only work history)** — a table inside `project-record.md`. Verbatim quotes of
  absorbed instructions and each run's deliverables live here — which is why the inbox can stay
  small.
- **`knowledge/decisions/` (organization-level decision records)** — the sources the "Revisiting the
  decision" boxes on this site cite. Since 2026-09-17, aise-core's originals (including
  CONSTITUTION.md) are written and maintained in English (source:
  `knowledge/decisions/2026-09-17-korean-to-english-conversion-executed-with-language-preference-mechanism.md`).

Two of these terms carry a short story of their own — knowing why these distinctions were needed
also makes clearer why the rest of the terms above ended up with the names and places they have
now.

::: info Revisiting the decision — the directory whose one name pointed to two things
**Problem**

- At one point, a single directory named `org/` held both this organization's own schema files
  (`README.md`, `OP_ORCHESTRATOR.md`, etc., belonging to the aise-core repository) and the actual
  instance data of a live deployment (role files, Project Records, etc., belonging to an entirely
  separate repository called `aise-instance-prod`).
- Even the Ops-staff, while auditing this, once got confused about which git repo tracked what and
  misdiagnosed something as a result.

**Investigation**

- The decision record identifies the core of the problem this way — *"A directory whose name is the
  mount point for two independent, differently-scoped git repositories is a standing source of
  confusion, not a one-time documentation gap."*
- Source: `knowledge/decisions/2026-08-06-org-instance-directory-split.md`

**Resolution**

- The instance data's mount point was moved from `org/` to **`instance/`**, named after that
  repository's own actual name.
- `org/` was left holding only schema files, and the same day it was renamed to **`schema/`** (source:
  `knowledge/decisions/2026-08-06-org-directory-renamed-to-schema.md`).

**The strength that followed**

- *"org/ is schema, full stop; instance/ is this deployment's own data, full stop"* — the
  distinction became self-evident just from the path name.
- This also explains why "Project Record" in the list above lives specifically under
  `instance/workspace/<project-id>/`.
:::

::: info Revisiting the decision — how the knowledge/decisions/ this glossary cites gets filled
**Problem**

- There was an actual case where one department's Decisions entry got independently re-adopted by an
  entirely unrelated department, and each time, there was no org-wide source to cite.
- A situation where both departments were still `active` and reusing each other's decisions was a
  blind spot that neither the retrospective review (which only opens once a department is `closed`)
  nor a promotion rule scoped to a single department could catch.

**Investigation**

- The decision record fills that gap this way — *"When a department's Decisions entry is found to
  have been independently adopted by a second, unrelated department ... that reuse is itself the
  trigger to write it up in knowledge/decisions/ immediately."*
- Source: `knowledge/decisions/2026-08-13-cross-department-decision-promotion-trigger.md`

**Resolution**

- Instead of waiting for a department to end, the moment reuse is confirmed becomes the promotion
  trigger — the retrospective review at `closed` time remains only as a final net for whatever this
  trigger missed.

**The strength that followed**

- *"whoever reads only one department's Project Record has no signal that the decision they're
  re-deriving is already settled org-wide"* — that problem disappears.
- Every decision record this glossary cites got into `knowledge/decisions/` exactly this way.
:::

## Wrap-up

**In one sentence.** This glossary is both an index of the terms used across the site and a
miniature demonstration of why they ended up split the way they did — the same name shouldn't
carry two meanings, and organization-wide knowledge is promoted the moment reuse is confirmed,
not once a department happens to end.

**To check this page for yourself**

1. Just skimming the file names in the `knowledge/decisions/` directory will give you a sense of
   what this organization has been wrestling with.
2. Open `instance/workspace/aise-org-site/project-record.md` (the record of the very department
   that built this site) to see how the decisions cited on this page were actually used.
3. Open aise-core's `schema/` directory and you'll find the four staff documents side by side
   (`OP_ORCHESTRATOR.md`, `HR_ORCHESTRATOR.md`, `AS_ORCHESTRATOR.md`, `MG_ORCHESTRATOR.md`) — you
   can see where the names outside the parentheses in this glossary actually live.

**Next.** To go back to the beginning and see the whole picture again → [Home](/en/).

*Source: the whole of `CONSTITUTION.md`, `schema/README.md`, `schema/*_ORCHESTRATOR.md`, `governance/MODE_POLICY.md`;
`knowledge/decisions/2026-08-06-org-instance-directory-split.md`,
`knowledge/decisions/2026-08-06-org-directory-renamed-to-schema.md`,
`knowledge/decisions/2026-08-13-cross-department-decision-promotion-trigger.md`.*
