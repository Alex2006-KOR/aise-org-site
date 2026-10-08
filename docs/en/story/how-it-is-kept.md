---
title: 5. How it is kept — hooks, watchlist, re-verification, handoff, tokens
---

# 5. How it is kept

::: lead
Written rules get broken, so only what truly must hold is enforced by hooks; the rest is decided from what actually
happened; reports are checked again; and memory and cost are carried on through records.
:::

In [3](/en/story/why-organization) I said I borrowed a structure that keeps the direction in exchange for leaving the
judgment to the agent. This page is about the devices that make that structure actually hold. Each comes with the
failure that gave rise to it.

::: tip This page is the trial page for the new way of citing sources
Under a point, only the kinds and counts show first, like "Sources: decisions 2 · rules 1 ▾"; click it to open the list.
Each source is marked as a record (record exists), my own experience (operator's recollection), or still a hypothesis.
If this format works, the other pages will adopt it.
:::

## Hooks: enforcing only what must hold {#hooks}

::: point A written prohibition was broken the very next day. The fix was not more text but a hook.
From 2026-08-24 the PM's role definition contained a sentence (in Korean) telling it not to replace the governed roles
with role-play prompts to a general-purpose agent. The next day, one department's PM handed all five slices of its run to general-purpose
agents instead of the approved roles — while that run's record said the approved roles had been used. It was found on
2026-08-28, while looking at subagent metadata with newly built tooling that reconstructs delegation structures.

Since the text was already there, writing more text was not judged a credible fix, and the delegation-check hook that
had been built earlier but left unwired was wired in.

<Cite ids="hooks-delegation" />
:::

::: point Before wiring the hook in, I tested with the real prompt whether it would have caught the real incident. It would not have. So it was fixed first, then wired in.
The real prompt had the shape "You are the backend-engineer of the (department name and description) department", with
81 characters between "You are" and the role id, so the first pattern did not match. The pattern was widened, the
real incident's prompt was added as regression test data, and a real tool-call payload was run end to end to confirm
that it is denied and that a correct delegation passes.

<Cite ids="hooks-delegation" />
:::

::: point I set the policy; Claude Code proposes how to implement it and why a hook is needed. I choose among the options.
Another example: the approval gate for editing an existing role file was deferred until there was a real edit to make
("nothing to dog-food against"), and built when a real case appeared. Building a new command as the approval signal was
rejected on my judgment that a mode-declaring command and a single approval sit at different interface levels, and the
option of having the hook ask a human directly was chosen. While building this gate, the same shape of code appeared
for the third time, so it was pulled out into a shared module. (Later, when the "reorganization" concept was dropped,
this gate's target changed too.)

<Cite ids="hooks-reorg,operator-policy" />
:::

## Not judging what has not happened: the watchlist {#watchlist}

::: point A problem that can only be judged once a condition arises in real operation goes on the "watchlist", and is judged when that condition actually arises.
For example, problems that can be seen only when two or more departments run at the same time, when a department
closes, or when a real delegation session takes place. What can be built as a synthetic scenario goes to a separate
regression list. Both exist to decide from "what actually happened", not "what might happen".

<Cite ids="watchlist,regression-fts,operator-watch" />
:::

## Reports are checked again: independent re-verification {#reverify}

::: point A department's "all done" is not trusted until checked. The PM re-checks members' results, and Ops-staff re-checks the PM's report, against the actual deliverables.
Even so, many items were marked done without an independent re-verification. That share is now being reduced: as of
2026-10-07, 20 of the 54 done items across all departments (37%) have been independently re-verified. It is a current
status, not a score.

<Cite ids="portfolio-report" />
:::

::: point A screen defect that no check caught was found by the operator looking at the service in a browser. Since then, screen work is finished only after a real-browser check.
One department's core editing function never once worked in a real browser for about two months (54 days). All that
time, unit tests, type checks and builds passed — because the test environment did not draw that part of the screen.
Now screen work is done only after its interaction is checked in a real browser, with the script and screenshots kept in
the product repository. The checks of this site's collapsing, expand-all and printing follow that rule.

<Cite ids="fts01-round4,pm-run-start" />
:::

## Memory: handoff and department records {#memory}

::: point I always kept a session's context use within 30% in mind, but finishing work inside that was very hard. So I came up with "handoff".
When using `aise-workflow` I always kept 30% per session in mind, because I knew the risk of context compaction. But
watching it constantly, finishing a unit of work within that was hard, and when a discussion came up, finishing it on the
spot was often the only way to get a fix that reflected the whole discussion. Above all, the work I was doing (work I had
been given by someone else, too) did not end in one session. So I looked for a way to record only the important facts of
finished work, and to let the next session carry on the unfinished work with the same knowledge.

<Cite ids="operator-handoff" />
:::

::: point Today it works like this: a department's PM starts each time with no memory by reading the department's three record files, and leaves a record before ending. A session measures its context use exactly and warns past a set level, and `/aise:handoff` writes the record to continue from.
The context amount is computed from the last response's recorded usage, not estimated. This is implemented for Claude
Code. The detailed procedure is in the reference page [Carrying on across sessions](/en/handoff).

<Cite ids="adapter-continuity,handoff-cmd" />
:::

::: point Even the search used to find this organization's records is my own general-purpose search product applied to my own organization.
One of the organization's departments built a personal, general-purpose search service (it only retrieves; it does not
generate answers), and the "AISE organization corpus" that bundles aise-core and the organization's records is one
deployment of that product. I used this search to find sources while writing this site. Keeping that data current is
that department's ongoing work.

<Cite ids="ragcurl-task" />
:::

## Cost: token monitoring {#tokens}

::: point Token tracking began while building handoff. Trying to measure the context amount with a hook so that records and direction would not be lost, I felt that a record of token usage was needed.
I had felt the need in the earlier frameworks too, but never actually used it. Handoff was the exact trigger.
:::

::: point Once delegation appeared, I had to measure "how many tokens went into which work". It is like a company hiring people and paying salaries, estimating development costs and setting budgets.
As a higher leader delegated detailed work downward, and a lower leader delegated further to roles below, I needed to
look into what work was done and how many tokens it took. The tokens I have are limited, so I had to forecast, track and
monitor them and use that as feedback for developing aise-core. Management-staff arose naturally along with these
functions.

<Cite ids="operator-tokens" />
:::

::: point Delegation was not chosen to save tokens. It was chosen because it fits the vertical structure and the structure of a real company, and token monitoring exists to improve the fixed cost that comes with choosing this structure.
I do not say "the organization is more expensive". What has been measured so far are totals per run, not a comparison
that separates the overhead of going through the organization from what was spent on the actual work. The tokens the
subagents used were all spent doing their own work and moving the project forward.

<Cite ids="operator-tokens" />
:::

::: point `/aise:usage` shows the tokens each agent used, by unit of work and by execution graph. The aim is not only to reduce the fixed cost but to see, as a whole, how a project is flowing and what judgments the PM is making.
The figures are computed from recorded usage, not estimated, and add up delegation at every depth. There is also a
dashboard that gathers the sessions.

<Cite ids="usage-cmd,operator-tokens" />
:::

::: point A PM run was once cut off midway by a usage limit. Instead of starting a new one, the same agent was woken up again and finished.
Something that looks stopped may not be dead, so the rule is to wake the same agent again rather than launch a new
agent on the same working folder. Launching a new one could put two agents on the same files at once.

<Cite ids="coordination-wave,revive-resume" />
:::

::: warning Review question Q-5 (for the operator — to be removed before publication)
The 3-way comparison material (reference answers versus the two search paths, P-11) is now out of the published site.
Once the comparison is done, the most natural place for it looks like a "how it was verified" section on this page
(after the independent re-verification section). I will ask you again then.
:::

<SourceTable />

**Next.** → [6. Distribution and many tools](/en/story/distribution)
