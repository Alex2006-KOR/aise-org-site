---
title: Glossary — All the Terms Used Here, in One Place
---

# All the terms used here, in one place

Here's a collection of the terms used throughout this site. If you're curious where a concept
came from, follow the link.

- **Department** — a unit consisting of a PM and members, accountable for one piece of work. It
  can be permanent, or it can be a project formed and dissolved around a specific task.
- **Project Member** — an expert role with single responsibility (SRP) over one domain.
- **PM (Project Manager)** — the role that breaks down and distributes a department's work, and
  represents the department in communicating with the Ops-staff. A line role within the
  [depth-2 pyramid](/en/organization-model).
- **Ops-staff / HR-staff / Asset-staff / Management-staff** — see
  [Staff & Governance](/en/staff-governance).
- **Organization Chart / Execution Graph** — see [Organization Model](/en/organization-model).
- **Provisioning** — the scope of tools, MCP servers, and skills a role can actually use.
  Approved by the Asset-staff.
- **Role-class** — a reusable role definition registered in the catalog
  (`instance/roles/`). A department-specific domain profile is added when it joins an actual
  department.
- **reuse_tier** — a role-class's reusability grade (`schema-mandated` / `generic-technical` /
  `domain-specific`).
- **draft / active / ended / closed** — a department's (project's) lifecycle status. See
  [Lifecycle](/en/lifecycle).
- **Operator mode / Meta mode** — see [Operator vs Meta Mode](/en/operator-vs-meta-mode).
- **Project Record** — made up of the PM's detailed continuity memory (`project-record.md`), the
  inbox of not-yet-absorbed instructions the Ops-staff leaves (`directive.md`), and the
  lightweight report sent to the Ops-staff (`report.md`).

Two of these terms carry a short story of their own — knowing why these distinctions were needed
also makes clearer why the rest of the terms above ended up with the names and places they have
now.

::: info Revisiting the decision — the same name shouldn't point to two different things
**Problem.** At one point, a single directory named `org/` held both this organization's own
schema files (`README.md`, `OP_ORCHESTRATOR.md`, etc., belonging to the aise-core repository) and
the actual instance data of a live deployment (role files, Project Records, etc., belonging to an
entirely separate repository called `aise-instance-prod`). Even the Ops-staff, while auditing
this, once got confused about which git repo tracked what and misdiagnosed something as a result.

**Investigation.** The decision record identifies the core of the problem this way — *"A
directory whose name is the mount point for two independent, differently-scoped git repositories
is a standing source of confusion, not a one-time documentation gap."*
(Source: `knowledge/decisions/2026-08-06-org-instance-directory-split.md`)

**Resolution.** The instance data's mount point was moved from `org/` to **`instance/`**, named
after that repository's own actual name. `org/` now holds only the four schema files.

**The strength that followed.** *"org/ is schema, full stop; instance/ is this deployment's own
data, full stop"* — the distinction became self-evident just from the path name. This also
explains why "Project Record" in the list above lives specifically under
`instance/workspace/<project-id>/`.
:::

::: info Revisiting the decision — how the knowledge/decisions/ this glossary cites gets filled
**Problem.** There was an actual case where one department's Decisions entry got independently
re-adopted by an entirely unrelated department, and each time, there was no org-wide source to
cite. A situation where both departments were still `active` and reusing each other's decisions
was a blind spot that neither the retrospective review (which only opens once a department is
`closed`) nor a promotion rule scoped to a single department could catch.

**Investigation.** The decision record fills that gap this way — *"When a department's Decisions
entry is found to have been independently adopted by a second, unrelated department ... that
reuse is itself the trigger to write it up in knowledge/decisions/ immediately."*
(Source: `knowledge/decisions/2026-08-13-cross-department-decision-promotion-trigger.md`)

**Resolution.** Instead of waiting for a department to end, the moment reuse is confirmed becomes
the promotion trigger — the retrospective review at `closed` time remains only as a final net for
whatever this trigger missed.

**The strength that followed.** *"whoever reads only one department's Project Record has no
signal that the decision they're re-deriving is already settled org-wide"* — that problem
disappears. Every decision record this glossary cites got into `knowledge/decisions/` exactly
this way.
:::

## Quick guide

**In one sentence.** This glossary is both an index of the terms used across the site and a
miniature demonstration of why they ended up split the way they did — the same name shouldn't
carry two meanings, and organization-wide knowledge is promoted the moment reuse is confirmed,
not once a department happens to end.

**To check this page for yourself**

1. Just skimming the file names in the `knowledge/decisions/` directory will give you a sense of
   what this organization has been wrestling with.
2. Open `instance/workspace/aise-org-site/project-record.md` (the record of the very department
   that built this site) to see how the decisions cited on this page were actually used.
3. You can also count for yourself that the `org/` directory has exactly 4 files
   (`README.md`/`OP_ORCHESTRATOR.md`/`HR_ORCHESTRATOR.md`/`AS_ORCHESTRATOR.md`).

**Next.** To go back to the beginning and see the whole picture again → [Home](/en/).

*Source: the whole of `CONSTITUTION.md`, `schema/README.md`, `governance/MODE_POLICY.md`;
`knowledge/decisions/2026-08-06-org-instance-directory-split.md`,
`knowledge/decisions/2026-08-13-cross-department-decision-promotion-trigger.md`.*
