---
title: 1. Background — why it started
---

# 1. Why it started

::: lead
It started because explaining the same rules over and over was exhausting, and over two frameworks the question
"what should I hand to AI?" gained a second one: "how, and how far, should I control it?"
:::

## The first month: the same explanation every time

::: point I have been using Claude Code for four months (as of October 2026). In the first month I tried its features one by one to see what it could do.
A few inconveniences showed up, and the biggest was the "same explanation every time" below.
:::

::: point Every time I built a workflow, I had to explain again the common rules that come with every workflow.
I ended up keeping, as a separate collection, the prompts I entered to apply my company's rules. For example:

- that the environment is usable only on an intranet
- that the use of external MCP servers is restricted
- where in the company the information to consult is kept
- what environment is currently running

(This is a public site, so no company's systems or rules are named; they are generalized like this.)
:::

::: point To let the agent carry this experience permanently, maintain it and extend it, I built a framework.
:::

## The first framework: aise-workflow

::: point `aise-workflow` took information I had provided in advance and produced the system prompt that automates a workflow I wanted.
I automated quite a few workflows with it. Along the way I learned the basic concepts of AI-agent tools: `CLAUDE.md`,
`AGENTS.md`, subagents and multi-agent setups.
:::

::: point What happened while building it gave me four needs. {#four-needs}
It used a lot of tokens; work disappeared when a session was reset; and even with the md files under version control on
GitHub, every new session produced different results. So I wrote down:

1. **A device that carries memory over is needed.**
2. **For consistent results, behavior that must be exact is built as a program, not left to an LLM.**
3. **Token use must be tracked, with statistics.**
4. **What I build must be distributable to other people, and give the same user experience after it is distributed.**

Where each of the four is answered is summed up at the bottom of this page.
:::

::: point But once built, the workflows turned out to be "programs that perform a fixed behavior". That is where I started asking "what should be handled by an AI agent?"
The workflows were scripts and md files, but what they did was always the same steps in the same order. Did that part
need to be an agent at all? This question ends in an unexpected direction in
[3. Why an organization](/en/story/why-organization).
:::

## The second framework: aise-development

::: point I redefined `aise-workflow` as "a tool for prototyping before building something as software", and built `aise-development`, a framework that develops those workflows into real software.
:::

::: point I studied software engineering and took part in many projects as an architect, so I wanted to put that way of working into the framework and document it.
I put workflows such as interviews, requirements analysis, choosing a development methodology, QA analysis,
architecture design and detailed component and module design into `aise-development`, and spent a lot of time on it.
Later I extended it, with many features, so that it could serve general software development and not only work
together with `aise-workflow`.
:::

::: point The more features I added, the more six problems appeared. {#six-problems}
1. Making it rich produced countless skills and rules, and I soon hit the limit of what I could manage.
2. The system prompt carrying skills, MCP plugins and development methodology kept growing, and the usable context
   window kept shrinking.
3. The two frameworks only got stronger if I learned the newly released MCP servers and Claude Code tools every day,
   and that was tiring.
4. What I care about differs by project, but sometimes it gathered requirements too briefly and built the product in
   a hurry, and sometimes it never started and only collected information. Consistent behavior was not guaranteed.
5. Because it was a framework that automated the development workflow, projects running at the same time shared no
   information, and the knowledge and methods learned did not accumulate.
6. I suffered from a great deal of hallucination. With no way to check that a policy I had set actually worked, I
   often learned late that a behavior I had trusted for a long time had not been happening.
:::

::: point Resources especially always held me back. Tokens ran out very fast, and I started thinking about switching only the tool while keeping the policy and memory, so a project could go on.
This thought leads to [6. Distribution and many tools](/en/story/distribution).
:::

## What I felt while developing: I was the overseer and the approver

::: point Software started in a different shape every time, but Claude Code would often start working before all the information had arrived.
Sometimes the requirements, the best design and how to meet the NFRs came to me all at once and I typed them in;
sometimes the software was defined as a set of features; sometimes analysing finished software and evaluating its
architecture to find improvements had to come first. Yet it sometimes started right away without the full picture, and
there were times when the information I could have given would have saved tokens and avoided unnecessary work.
:::

::: point With development methodology, too, it felt less like it looked for the best one and more like it answered something, somehow, whenever a prompt came in.
:::

::: point This matters because of where I stand: I am the stakeholder who gave the requirements, the one who finally inspects and approves the result, and the overseer who checks the plan, the design and the intermediate outputs.
I am also the one who has to get the best result I want for a single payment.
:::

::: point But the points where I could intervene were very narrow. Enforcing through workflows made things slow; leaving things loose produced results far from what I wanted.
Enforcing through workflows easily slowed things down, made the development flow redundant, or turned into
micromanagement through too much intervention. Without limits, something far from the result I wanted came out as the
deliverable — a tragedy that repeated a few times.
:::

::: point So on top of "what should AI agents solve?", "how should I control them, and what is the right scope of control?" became the most important question. {#the-question}
aise-core is my answer to this question. The line of the answer is in
[3. Why an organization](/en/story/why-organization); what it actually looks like is on the very next page,
[2. At a glance](/en/story/at-a-glance).
:::

## Where the four needs are answered

| Need | Where | In one line |
|---|---|---|
| 1. A device that carries memory over | [5. How it is kept](/en/story/how-it-is-kept) — handoff, department records | Finished work is recorded as its important facts only; unfinished work is recorded so the next session continues with the same knowledge. |
| 2. Exact behavior as programs | [3. Why an organization](/en/story/why-organization), [5](/en/story/how-it-is-kept) — hooks and scripts | Claude Code judges and proposes what to build as a program; policies that must hold are enforced by hooks and scripts. |
| 3. Token tracking and statistics | [5. How it is kept](/en/story/how-it-is-kept) — token monitoring | It began while building handoff, and is used to watch the fixed cost of the delegation structure. |
| 4. Distribution with the same user experience | [6. Distribution and many tools](/en/story/distribution) | Policy, hooks and tools are distributed, not the organization. What must be the same (keeping the policy) is handled by hooks, scripts and policy documents; the organization is left open to differ from user to user. |

::: warning Review question Q-1 (for the operator — to be removed before publication)
Of the six problems, 1 and 2 (managing skills and rules, prompt bloat) and 6 (no way to check that a policy works) are
answered in the source material (dynamic tool approval and governance — part 8; hooks and the watchlist — part 23).
For 3 (the fatigue of learning new tools daily), 4 (inconsistent behavior from project to project) and 5 (no knowledge
sharing or accumulation across projects), you have not said directly which part of aise-core answers them. I did not
fill them in by guessing. If you confirm what answers each (e.g. 3 → the asset staff researches and approves tools,
4 → the PM's plan and definition of done, 5 → the portfolio, retrospectives and Ops-staff's cross-department
coordination), I will add them to the table.
:::

**Next.** → [2. At a glance](/en/story/at-a-glance)
