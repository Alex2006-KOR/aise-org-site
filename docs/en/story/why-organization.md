---
title: 3. Why an organization — control and the organization model
---

# 3. Why an organization

::: lead
I gave up controlling the agent finely through prompts and left the judgment to it. In exchange, so that results come
out the way I want, I borrowed the separation of responsibility that real companies use.
:::

[1. Background](/en/story/background) ended with the question "what should I hand to AI, and how should I control
it?". This page is the story of how the answer to that question became "an organization".

## Fine control failed

::: point Even with the steps of a workflow laid down, the agent kept skipping some of them.
When asked, it answered things like "I thought it was unnecessary", "I thought that was what you meant", "thinking it
over, another way looked better".
:::

::: point Putting safeguards like "never do this", "you must do this", "run this command" into the system prompt did not bring it under control.
Admittedly, the model I used then was a lower-performance one. Even so, I felt this kind of fine-tuning was pointless.
:::

::: point So I turned the other way: use the model's capability to the full, and let it draw up its own execution plan and carry it out.
:::

## Agonizing over "what should be an agent" was itself the waste {#agent-or-program}

::: point The question that began in [1. Background](/en/story/background) — "what should an AI agent handle and what should be a program?" — ended not with an answer but with putting the question down.
I caught myself agonizing in detail over what to implement and how, and it was not a pretty sight. I needed a tool for
doing software engineering and developing software, and constraining Claude Code's behavior through fine adjustments
felt wrong. I came to think that even agonizing over what to implement as an AI agent was a waste of time and
unnecessary.
:::

::: point Instead I modeled an organization: give orders, hold to account, check the results — but leave as much judgment as possible to Claude Code, including deciding for itself what to build as a program.
That is what happened. The policies were mine, but how to implement them was always proposed by Claude Code, which
always explained why a hook (a check script the tool runs right before an action) was needed here. I set the policy and
choose among the options. For example, I rejected the option of building a new command as the approval device, because
it sat at the wrong interface level, and picked the option of using the hook's "ask a human" response. Cases like this
are collected in [5. How it is kept](/en/story/how-it-is-kept).

Source: `knowledge/decisions/adapter/hooks.md` "2026-09-01 — reorg-approval-gate-shared-common-module" (record exists).
:::

## Once you hand it over, you need a structure that keeps the direction

::: point Even with the execution plan and the execution left to Claude Code, the quality of the result had to stay at a certain level and go in the direction I wanted. I needed a structure that manages that well.
Giving up fine control did not mean giving up control. Instead of tying down each behavior, I decided to tie down who is
responsible for what. These are two different stories: the failure of fine control, and a structure that keeps the
direction.
:::

::: point The answer was close at hand: the structure of the company I actually work in.
I don't mean a particular company. I mean how the structure called a company makes a profit, how it manages people,
and how it manages the tools people need to work.
:::

::: point What I borrowed is the company's "separation of responsibility" — in software terms, the single-responsibility principle (SRP).
I borrowed it not because org charts are an old, familiar way, but because responsibilities in it are split without
overlapping. And along the way I had a big realization: a system prompt that gives instructions to AI agents, like
aise-core (often called a "harness"), is no different from designing and implementing software, and software design
principles and development methods must be applied to it as they are. The principles have their own page,
[4. Principles](/en/story/principles).
:::

::: point Delegation was not chosen to save tokens. {#not-for-tokens}
I said in [1. Background](/en/story/background) that tokens were always short, but that does not mean the delegation
structure was picked as a token-saving measure. Delegation was chosen because it matches the structure of a real
company, and token monitoring exists to watch and reduce the fixed cost that comes with choosing this structure. I do
not claim the organization "uses more tokens" — no such comparison has been measured. More in
[5. How it is kept](/en/story/how-it-is-kept#tokens).
:::

## What was built first, and why

::: point The very first things were three: swapping skills and MCP servers in when needed instead of loading them every time, a common policy like company rules (governance), and a vertical organization (Ops-staff).
The first two answer problems 1 and 2 of [1. Background](/en/story/background) (skills and rules beyond what I could
manage; a system prompt so large it ate the context).
:::

::: point The earlier frameworks had neither multiple agents nor an orchestrator, because they worked by solving problems in conversation with me. This time I modeled myself as "the leader of an organization".
A leader who manages, supervises and guides appropriately, tracks progress, and looks into the details when needed. I
thought I had to model the people that organization needs and how they are managed — down to the organizational change
of hiring, firing and moving people between departments, as a real company does.
:::

::: point Meta mode: besides the axis of making a profit through projects, a company has an axis of management that develops the organization itself.
A chief executive works out how to develop the organization, buys a building, brings in tools such as AI, or merges
with another company. A single persona, Ops-staff, could not hold this, so I created Meta mode to make governance more
concrete and to model something more like a company. At first I used Meta mode with no persona at all; Management-staff
was added later (together with the need for token tracking — [5](/en/story/how-it-is-kept#tokens)). The difference
between the two modes is in the reference page [Operator vs Meta Mode](/en/operator-vs-meta-mode).
:::

::: point HR-staff: since people were defined first, a leader to manage them was needed, and by SRP it became a separate role.
Ops-staff is the final owner of the profit-making projects, so managing people falls outside that responsibility. That
is why I thought a leader for people had to be created. How people's "growth" was modeled is in
[7](/en/story/growth-and-limits).
:::

::: point Asset-staff: inspired by the fact that companies review and approve a high-impact tool such as AI before adopting it.
Many companies adopting AI tools worry about security and other constraints, and security is a problem I face too, so I
took it very seriously. When you join a company, you learn the basic rules of life there from HR and receive the tools
you may use from the asset team. Asset-staff models this. Adopting a high-impact tool should be approved by the chief
executive, so such tools (the tier that needs isolation) pass through a gate that requires the operator's approval.
:::

::: point A project is treated as a department — to guarantee each project's independence, and isolated to make the most of the vertical structure.
Projects a company runs for profit vary widely in kind and character, so I thought they had to be independent of each
other. Work inside a project is the PM's responsibility; managing and coordinating across projects is Ops-staff's; the
higher a position, the wider its view.

Splitting responsibility this way means a lower agent handles only its single task, so it is not handed unneeded or
confusing information, and it can be made to produce predictable output. The PM does not develop, so it does not go
through development's trial and error; it focuses only on combining the separately produced outputs into the final
result and on the execution plan. The grounds are not the quality of the result but a software-design ground:
**separation of responsibility — maintainability and predictability**.
:::

## Why a vertical structure

::: point Horizontal or vertical, a higher layer is needed to turn conclusions into the final result. aise-core chose not debate but "where to fix responsibility". {#vertical}
What follows is design reasoning about this choice. No horizontal version was built and compared, so this is not a
claim that vertical is better.
:::

::: point ① Even with agents arranged horizontally, a higher layer is needed to turn their conclusions and agreements into the final result.
Putting things together to fit verification and the software-engineering flow is somebody's job. Under that higher
layer, the lower agents can debate horizontally, or each can do its part in parallel and the higher layer combines them.
aise-core chose the latter.

A real example: one department's PM split the work among three members of the same role, handed it to them on separate
branches in parallel, checked the results and merged them into one (step ③ in [2. At a glance](/en/story/at-a-glance)).
Source: the wiki platform's product repository, merge commit `ed23834`; that department's project record, Ledger
`op-batch-absorb-2026-10-01-wiki` (record exists).
:::

::: point ② Responsibility boundaries and a single writer for each record. Inside a project it is the PM, between departments it is Ops-staff, and a department's records are written only by its PM.
Ops-staff writes only the instruction file inside a department. This boundary is not left to the text; the tool blocks
it — in the words of Ops-staff's own document, *"The adapter enforces this boundary, because stating it was not
enough"*. For the same reason, I judged that letting agents of the same role debate one topic would empty roles and
templates of meaning, break the responsibility boundaries and make governance hard.

One observation: the 7 record commits the departments' PMs made from 2026-10-01 to 10-06 (`329bbfc`, `30d7683`,
`b73043b`, `df84bf9`, `a8e713b`, `5ef011e`, `d7cc867`) each touched only that department's own folder. That is an
observation of one week and seven commits, not proof.

Source: `schema/OP_ORCHESTRATOR.md` (rule); the commits above in the organization's records repository (record exists).
:::

::: point ③ Written rules get broken. So only the few points that truly must hold are enforced by hooks, and the rest is left to the model's judgment.
The real case of a written prohibition broken the very next day, and how the hook was then built and tested, is in
[5. How it is kept](/en/story/how-it-is-kept#hooks).
:::

::: point ④ Control must be easy for the operator, and the operator's own ability must not come to depend on aise-core. This is a design requirement, not a claim of superiority.
- The operator talks only to the staff and does not instruct a PM directly. Technically there are ways to peek at or
  reach a PM or the agents below it, but this is a structural choice against micromanagement. When a particular matter
  interests me, I ask Ops-staff for a detailed report or give detailed instructions through it, and that goes through
  discussion and recommendations. I accept that opinions on this can differ.
- The points of intervention are not fixed as a list. The PM judges, and what needs a decision comes up by report.
- Only a few points structurally must pass through the operator: approving a high-impact tool, ending a department, and
  changes of policy and governance and their audit. (The former concept of a "reorganization" sign-off has been
  dropped. Hiring, changing and firing roles is HR-staff's job, and the operator is informed by report.)
:::

## What was given up

::: point Agents at the same level are not allowed to debate each other and reach a result on their own. {#given-up}
These days, letting agents discuss among themselves and reach results on their own is widely used. aise-core was built
to develop software for software engineering, and to handle instructions that come down from the top in a company. So
the user, as the top leader, knows all the information, and debate between agents of equal level is not allowed. It may
be a policy that limits what agent tools can do, but it is a decision made to produce the results that best match the
user's expectations.
:::

::: point This is not a lock, though. Behavior is limited by the software's structure, so the architecture is left open to be evaluated and redesigned at any time.
:::

**Next.** → [4. Why: principles](/en/story/principles)
