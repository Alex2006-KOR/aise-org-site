---
title: Briefing — aise-core on one page
---

# aise-core on one page

::: lead
**An AI-agent organization governance framework that fixes responsibility and leaves judgment to the agents** —
this is how I describe aise-core for now (a provisional definition).
:::

To be honest, I still don't know what to call aise-core. The line above is only how I explain it today, and I will
change it if I find a better word. Below is the whole site reduced to one page. Each line takes you to the detailed
page for that stage.

## The story, in order

::: point **[1. Background](/en/story/background)** — Four months into Claude Code (as of October 2026), tired of explaining the same rules every time, I started building frameworks.
Two rounds of trial and error (`aise-workflow`, `aise-development`) left me with four needs and six problems, and in
the end the question "what should I hand to AI?" gained a second one: "how, and how far, should I control it?"
→ [Background](/en/story/background)
:::

::: point **[2. At a glance](/en/story/at-a-glance)** — The operator talks only to the staff, the staff set up departments, and each department's PM splits the work and hands it to members.
One structure figure, one real request from this week followed from start to finish, and one table of who does what.
→ [At a glance](/en/story/at-a-glance)
:::

::: point **[3. Why an organization](/en/story/why-organization)** — I tried to control the agent finely through prompts and failed, and found that even deciding "what should be an agent" was wasted effort.
So I left the judgment to the agent and borrowed a company's separation of responsibility as the structure that keeps
results going the way I want. → [Why: control and the organization model](/en/story/why-organization)
:::

::: point **[4. Principles](/en/story/principles)** — Principles and boundaries are fixed first; features stay open. The two central axes are OCP and SRP.
For the other SOLID principles, SSOT and the layered pattern, I separate what was applied on purpose from what turned
out to fit naturally. → [Why: principles](/en/story/principles)
:::

::: point **[5. How it is kept](/en/story/how-it-is-kept)** — Written rules get broken, so only what truly must hold is enforced by hooks; the rest is decided from what actually happened.
The watchlist, independent re-verification, handoff, token monitoring — and the failures along the way.
→ [How it is kept](/en/story/how-it-is-kept)
:::

::: point **[6. Distribution and many tools](/en/story/distribution)** — What is distributed is policy, hooks and tools, not the organization; users shape their own organization.
The design supports many tools, but it is implemented only for Claude Code and **not yet tested** on any other tool.
→ [Distribution and many tools](/en/story/distribution)
:::

::: point **[7. Growth, results, limits](/en/story/growth-and-limits)** — Growth accumulates in the portfolio and the common templates, not in an individual role. Results are still **TBD**.
The projects are in progress, so I judged an evaluation premature. What is still unsolved is collected in the limits
section. → [Growth, results, limits](/en/story/growth-and-limits)
:::

## How to read this site

::: point Every page has three levels: one sentence, bullet-point key points, and collapsed detail.
When presenting or skimming, read only the key points. Click a point to open the reasoning, the real case and the
record behind it. **Expand all / Collapse all** at the top of a page switches everything at once, and printing
includes the collapsed content.
:::

::: point The story track comes first; the reference pages come after it.
The story track (1–7) follows the order in which I lived it. Detail on the structure, the modes, the lifecycle and so on
lives in the existing reference pages, and the story pages link to them. The former front page is kept as
[AISE overview](/en/overview).
:::

::: point How sure each claim is, is marked: designed · implemented · not yet tested, and record exists · operator's experience · hypothesis.
I don't write what has not been tried as if it had been. I also mark whether the support is a record, my own memory and
experience, or still a hypothesis. The repository that holds the records (aise-core) is private today and will be
published later, so for now only paths are given, with no links.
:::

::: point This is not any one company's story.
It draws on what I experienced at work, but it uses no company's systems or rules; they are generalized, as in "an
environment usable only on an intranet".
:::

**Next.** → [1. Background](/en/story/background)
