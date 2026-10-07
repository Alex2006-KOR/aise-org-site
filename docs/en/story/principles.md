---
title: 4. Principles — principles and boundaries first, features left open
---

# 4. Principles

::: lead
Principles and boundaries are fixed first; features stay open. The two central axes are OCP and SRP, and for the other
principles I separate what was applied on purpose from what turned out to fit naturally.
:::

In [3. Why an organization](/en/story/why-organization) I told of realizing that a harness like aise-core is software
too, so design principles must be applied to it as they are. This page is about those principles.

## How I design

::: point "Fix principles and boundaries first; leave features open." {#stance}
What I fix early: principles, responsibility boundaries, architectural risks and customer-requirement risks. What I
leave open: the implementation of detailed features.

I was an architect who settled almost 90% of the principles, values and design before going ahead. A little
embarrassingly, I was trained in methods like UP, developed mostly in a hybrid, quasi-agile way with a few sprint
cycles grafted on, and never experienced orthodox agile. So early in a design I draw out the architectural risks and the
requirement risks first, make a design, and start with much left open. "Settle 90%" and "leave much open" look like a
clash, but what is settled is the principles and what is left open is the detailed features, so they are one story.
:::

::: point This is not a habit; it is a way of working that came from experience.
I was usually given a start rather than a start and an end, and in many cases was later asked to extend the features.
So I designed in a way that could be extended as long as the design principles did not collapse and the software did
not step outside its responsibility boundaries.
:::

## Two central axes: OCP and SRP

::: point These two are central because they were the problems I ran into most directly while designing and developing with many people.
I say it as my own experience, not as a general law. That is why I always think about them carefully.
:::

::: point SRP (separation of responsibility) — who handles what must not get mixed up. {#srp}
Ops-staff handles work, HR-staff people (roles), Asset-staff tools, Management-staff improving the organization itself,
and the PM only the work inside its department. Each record has one writer, and the tool enforces that boundary. Having
a separate HR-staff at all is the result of applying SRP to managing people ([3](/en/story/why-organization)).

To keep SRP, I did a lot of refactoring across aise-core's parts. On 2026-09-30 a SSOT and duplication audit covered the
whole repository (see SSOT below), and on 2026-10-01, following it, the rule documents, schema and adapters were
rewritten and the staff documents were brought into one common format. The 124 decision-record files were moved into
30 topic files, the staff's files were gathered into one folder, and each writer of a record now commits its own units.

Source: aise-core commits `e314f6d`, `8625c8d`, `31e90d2`, `f53429b` (record exists, repository private).
:::

::: point OCP (open for extension, closed for modification) — the most important principle, because it is a project whose end cannot be known. {#ocp}
aise-core had a start, but its end could not be known. Especially after I decided to model a company, I had to account
for the fact that it must be maintained and keep developing until the company closes its doors.

- Left open: new tools (added to the approved list), new roles (hiring), new tool environments (adapters).
- Kept closed: governance and responsibility boundaries.

OCP is applied to two things: the growth of the organization and the growth of people. The organization is open to
bringing in new tools while governance is applied firmly, and whenever a project ends, the insight gained from it is
grown into an organizational capability in Meta mode. How people's growth was actually modeled turned out differently
from my first idea; that story is in [7. Growth](/en/story/growth-and-limits).

The reference page [How the structure absorbs change](/en/structural-principles-ocp) has decision cases where OCP was
actually applied.
:::

## The rest of SOLID — graded honestly

::: point I (interface segregation) — applied on purpose. Each role receives only the tools it needs.
Every role definition has a `provisioning` list (e.g. as of 2026-10-07, backend-engineer has seven), and each tool comes
with conditions of use. The starting point was the skills and MCP servers loaded every time without need
([3](/en/story/why-organization)). Strength of evidence: medium to strong.
:::

::: point D (dependency inversion) — applied on purpose. I persistently instructed that the design cope with my switching tools.
The rules live in an abstraction written without any tool's vocabulary (the adapter requirements list), and each tool's
adapter implements it. A new tool means building one new adapter, not rewriting the rules. Strength of evidence: strong
in structure. But there is still only one adapter, for Claude Code ([6](/en/story/distribution)).
:::

::: point L (Liskov substitution) — not designed in; it fit naturally.
Whether an adapter satisfies the requirements is checked mechanically (run at every entry into Operator mode), so an
adapter that satisfies them can stand in for another. Limit: there is only one implementation, so nothing has actually
been swapped. Strength of evidence: weak to medium. I don't oversell it.
:::

::: point The role templates follow the Template Method pattern. The "strategy pattern" I first planned did not quite fit. {#template}
A common base (the base template for every member; the PM has its own) sets the skeleton and the common rules ("the
basic qualifications of an employee at the aise-core company"), and each role's definition fills in what differs on top
of it — the relationship of an abstract base and concrete definitions.

My original plan was to put the basic attributes in an abstract template and make domain knowledge a strategy. But the
design went another way. A role definition holds no department-specific domain background; when a role first joins a
department, HR-staff researches a domain profile fitting that department and keeps it in that department's project
record. It is closer to injecting context per department than to a swappable strategy.
:::

## SSOT — a separate principle, outside SOLID

::: point It removes the case where the same content sits in several places and drifts apart. The 2026-09-30 audit was not just tidying: it found real functional defects. {#ssot}
The audit read the whole repository in seven parts and produced about 250 findings; after merging duplicates, the first
consolidation left **12 functional defects where enforcement actually behaved wrongly**, about 20 matters needing the
operator's decision, and about 140 clear fixes such as stale descriptions or broken references (follow-up work added a
few more functional defects). Moving the decision records into topic files was one of this audit's decisions.

Source: `knowledge/evaluation/2026-09-30-ssot-duplication-audit.md` (evaluation record, repository private).
:::

## The layered architecture

::: point The vertical hierarchy takes the layered architecture as its model. Not only because an organization was being modeled, but as a choice to separate concerns and gain maintainability and readability. {#layered}
The correspondence:

| Layered architecture | aise-core |
|---|---|
| A layer talks only to adjacent layers | Operator ↔ staff ↔ PM ↔ member, no skip-level |
| A higher layer knows only the interface, not the lower layer's internals | The PM is the department's single point of contact |
| A limited number of layers | The line of execution accountability is at most two levels; delegation also at most two |
| Wider concerns higher up | A wider view higher up (department → between departments → the whole organization) |
:::

::: point The names come from the language of organizations (staff, department, PM, hiring, firing), so that even a first-time reader can guess the structure.
This is design intent, not a result confirmed by a user study. That is also why this site writes a plain word next to
aise-core's real names (reference page [Glossary](/en/glossary)).
:::

**Next.** → [5. How it is kept](/en/story/how-it-is-kept)
