---
title: 1. Why it started — the cost and disorder of many AI projects
---

# 1. Why it started

::: lead
Running several projects with AI agents at once makes costs climb fast and results uneven. aise-core starts from these two problems.
:::

## Recurring common rules {#common-rules}

Every workflow carries the same common rules: the environment is intranet-only, external MCP servers may not be used,
the information to consult lives in a known place, a particular execution environment is running. The agent does not
remember any of this. Each new workflow needed the same explanation again from the start.

<figure>
<svg viewBox="0 0 560 250" role="img" aria-label="Workflows A, B and C each hold their own copy of the common rules, above their own specific steps">
  <text x="280" y="24" text-anchor="middle" font-size="14" font-weight="600">Every workflow gets the common rules again</text>
  <g>
    <rect x="20" y="45" width="160" height="180" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
    <text x="100" y="68" text-anchor="middle" font-size="13" font-weight="600">Workflow A</text>
    <rect x="34" y="82" width="132" height="58" rx="5" fill="none" stroke="#c1652a" stroke-width="2" />
    <text x="100" y="106" text-anchor="middle" font-size="13" fill="#c1652a">Common rules</text>
    <text x="100" y="126" text-anchor="middle" font-size="12" fill="#c1652a">(copy 1)</text>
    <rect x="34" y="152" width="132" height="58" rx="5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
    <text x="100" y="186" text-anchor="middle" font-size="13">Own steps</text>
  </g>
  <g>
    <rect x="200" y="45" width="160" height="180" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
    <text x="280" y="68" text-anchor="middle" font-size="13" font-weight="600">Workflow B</text>
    <rect x="214" y="82" width="132" height="58" rx="5" fill="none" stroke="#c1652a" stroke-width="2" />
    <text x="280" y="106" text-anchor="middle" font-size="13" fill="#c1652a">Common rules</text>
    <text x="280" y="126" text-anchor="middle" font-size="12" fill="#c1652a">(copy 2)</text>
    <rect x="214" y="152" width="132" height="58" rx="5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
    <text x="280" y="186" text-anchor="middle" font-size="13">Own steps</text>
  </g>
  <g>
    <rect x="380" y="45" width="160" height="180" rx="8" fill="none" stroke="currentColor" stroke-width="1.5" />
    <text x="460" y="68" text-anchor="middle" font-size="13" font-weight="600">Workflow C</text>
    <rect x="394" y="82" width="132" height="58" rx="5" fill="none" stroke="#c1652a" stroke-width="2" />
    <text x="460" y="106" text-anchor="middle" font-size="13" fill="#c1652a">Common rules</text>
    <text x="460" y="126" text-anchor="middle" font-size="12" fill="#c1652a">(copy 3)</text>
    <rect x="394" y="152" width="132" height="58" rx="5" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
    <text x="460" y="186" text-anchor="middle" font-size="13">Own steps</text>
  </g>
</svg>
<figcaption>Figure 1-1. The common rules need to be decided only once, yet every new workflow adds another copy.</figcaption>
</figure>

<Cite ids="op-common-rules" />

## First attempt: a prompt-generating framework {#first}

A framework was built that takes the common rules and information given in advance and produces the system prompt for
a workflow to automate. It was called `aise-workflow`. Several workflows were automated with it, and the basic concepts
of agent tools — `CLAUDE.md`, `AGENTS.md`, subagents, multi-agent setups — were learned along the way.

::: point In detail — four needs that surfaced in use {#four-needs}
**Background.** The framework worked, but the same losses kept recurring while it was used.

**Problem.**

- Token consumption was high.
- Work in progress disappeared when a session was reset.
- Even with the md files under version control on GitHub, each new session produced different results.

**The needs, written down.**

1. A device that carries memory over is needed.
2. Behavior that must be exact is built as a program, not left to an LLM.
3. Token use must be tracked, with statistics.
4. What is built must be distributable to other people, and give the same user experience after distribution.

Where each of the four is solved is in the table at the end of this chapter.

<Cite ids="op-four-needs" />
:::

## A blurred line: program or agent {#agent-or-program}

The workflows were made of scripts and md files. Yet what they did was always the same steps in the same order. Fixed
behavior is what a program is for. This raised the question: what should be left to an agent, and what should be built
as a program? The conclusion is in [chapter 2](/en/story/at-a-glance#control).

<Cite ids="op-agent-or-program" />

## Second attempt: a software-engineering framework {#second}

The first framework was redefined as "a tool for trying a workflow out before developing it as software". A separate
framework was built to develop those workflows into real software. It was called `aise-development`. It carried the
workflows of software engineering — interviews, requirements analysis, choosing a development methodology, QA analysis,
architecture design, component and module design — and kept gaining features so that it could serve general software
development.

<Cite ids="op-second-framework" />

## Six problems: cost and disorder {#six-problems}

Every added feature brought a new problem. They come down to six: three are problems of cost, three are problems of
disorder.

<figure>
<svg viewBox="0 0 560 300" role="img" aria-label="The six problems in two groups. Cost: skills and rules past the limit of management, a system prompt eating the context window, the fatigue of learning new tools every day. Disorder: behavior that varies by project, no knowledge carried between projects, no way to check that a policy works">
  <rect x="15" y="15" width="255" height="270" rx="10" fill="none" stroke="#c1652a" stroke-width="2" />
  <text x="142" y="44" text-anchor="middle" font-size="15" font-weight="600" fill="#c1652a">Cost</text>
  <rect x="32" y="62" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="44" y="86" font-size="13" font-weight="600">1. Past management</text>
  <text x="44" y="108" font-size="12">Skills and rules keep multiplying</text>
  <rect x="32" y="134" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="44" y="158" font-size="13" font-weight="600">2. Context eaten</text>
  <text x="44" y="180" font-size="12">The system prompt fills the window</text>
  <rect x="32" y="206" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="44" y="230" font-size="13" font-weight="600">3. Learning fatigue</text>
  <text x="44" y="252" font-size="12">New tools to follow every day</text>

  <rect x="290" y="15" width="255" height="270" rx="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4" />
  <text x="417" y="44" text-anchor="middle" font-size="15" font-weight="600">Disorder</text>
  <rect x="307" y="62" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="319" y="86" font-size="13" font-weight="600">4. Uneven behavior</text>
  <text x="319" y="108" font-size="12">Each project runs differently</text>
  <rect x="307" y="134" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="319" y="158" font-size="13" font-weight="600">5. Knowledge cut off</text>
  <text x="319" y="180" font-size="12">Nothing carries across projects</text>
  <rect x="307" y="206" width="221" height="62" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
  <text x="319" y="230" font-size="13" font-weight="600">6. Nothing to check</text>
  <text x="319" y="252" font-size="12">No way to see a policy work</text>
</svg>
<figcaption>Figure 1-2. The six problems. On the left, costs that grow with use; on the right, disorder that makes results unpredictable.</figcaption>
</figure>

::: point In detail — the six problems one by one
1. **Past management.** Making the framework rich produced countless skills and rules, soon more than one person could manage.
2. **Context eaten.** The system prompt carrying skills, MCP plugins and development methodology kept growing. The
   context window left for real work shrank by as much.
3. **Learning fatigue.** The two frameworks got stronger only if newly released MCP servers and Claude Code tools were
   learned every day. Research can be given to an agent; keeping up with what is new stayed a human's job.
4. **Uneven behavior.** What matters differs by project. Sometimes requirements were gathered too briefly and the
   product built in a hurry; sometimes nothing was started and only information collected.
5. **Knowledge cut off.** As a tool that automated the development workflow, it passed no information between projects
   running at the same time. Knowledge and methods learned did not carry into the next project.
6. **Nothing to check.** Hallucination was frequent. With no way to check that a policy actually worked, it often
   turned out late that a behavior long trusted had not been happening.

<Cite ids="op-six-problems" />
:::

## Resources run out first {#resources}

Tokens ran out very fast. A way was needed to switch only the tool and keep the policy and memory, so that a project
could go on. This need leads to [chapter 8](/en/story/distribution).

<Cite ids="op-resources" />

## The human's place: stakeholder · overseer · approver {#the-question}

When software is built with AI agents, the human holds three places: the stakeholder who gives the requirements, the
overseer who checks the plan, the design and the intermediate outputs, and the approver who inspects and accepts the
final result. The human is also the one who must get the wanted result for a single payment.

::: point In detail — background, problem, direction
**Background.** Software starts in a different shape every time. Sometimes the requirements, the design and how to meet
the NFRs are settled at once from the start. Sometimes the software is defined as a set of features. Sometimes analysing
existing software and evaluating its architecture to find improvements has to come first.

**Problem.**

- The agent would often start before all the information had arrived. Waiting would have saved tokens and avoided work
  that was not needed.
- With development methodology, too, it leaned less toward choosing one that fits and more toward answering something,
  somehow, whenever input came in.
- The points where a human could intervene were narrow. Enforcing through workflows slowed things down, duplicated the
  flow and easily turned into micromanagement. Without enforcement, results far from the intent kept coming out.

**Direction.** The question changed. On top of "what should AI agents solve?" came "how should they be controlled, and
what is the right scope of control?", and this became the most important question.

<Cite ids="op-control" />
:::

## The remaining question: how and how far to control {#control}

aise-core is the answer to this question. The line of the answer is in [chapter 2](/en/story/at-a-glance), the principles in
[chapter 3](/en/story/principles), the whole structure in [chapter 4](/en/story/structure).

<figure>
<svg viewBox="0 0 560 210" role="img" aria-label="The flow of this chapter: the same rules explained again, first attempt, four needs, second attempt, six problems, the question of control, aise-core">
  <defs>
    <marker id="bg-flow-en" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
    </marker>
  </defs>
  <rect x="10" y="20" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="70" y="44" text-anchor="middle" font-size="12">The same rules</text>
  <text x="70" y="62" text-anchor="middle" font-size="12">explained again</text>
  <line x1="130" y1="48" x2="148" y2="48" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow-en)" />
  <rect x="150" y="20" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="210" y="44" text-anchor="middle" font-size="12">First attempt</text>
  <text x="210" y="62" text-anchor="middle" font-size="12">prompt generation</text>
  <line x1="270" y1="48" x2="288" y2="48" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow-en)" />
  <rect x="290" y="20" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="350" y="53" text-anchor="middle" font-size="13" font-weight="600">Four needs</text>
  <line x1="410" y1="48" x2="428" y2="48" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow-en)" />
  <rect x="430" y="20" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="490" y="44" text-anchor="middle" font-size="12">Second attempt</text>
  <text x="490" y="62" text-anchor="middle" font-size="12">software eng.</text>
  <path d="M 490 76 L 490 104 L 70 104 L 70 128" fill="none" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow-en)" />
  <rect x="10" y="130" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="70" y="154" text-anchor="middle" font-size="12">Six problems</text>
  <text x="70" y="172" text-anchor="middle" font-size="12">cost · disorder</text>
  <line x1="130" y1="158" x2="148" y2="158" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow-en)" />
  <rect x="150" y="130" width="120" height="56" rx="6" fill="none" stroke="currentColor" stroke-width="1.3" />
  <text x="210" y="154" text-anchor="middle" font-size="12">The question</text>
  <text x="210" y="172" text-anchor="middle" font-size="12">of control</text>
  <line x1="270" y1="158" x2="288" y2="158" stroke="currentColor" stroke-width="1.5" marker-end="url(#bg-flow-en)" />
  <rect x="290" y="130" width="120" height="56" rx="6" fill="none" stroke="#c1652a" stroke-width="2" />
  <text x="350" y="163" text-anchor="middle" font-size="13" font-weight="600" fill="#c1652a">aise-core</text>
</svg>
<figcaption>Figure 1-3. The flow of this chapter. The needs and problems of two attempts converge on one question: how to control.</figcaption>
</figure>

## Problems and the chapters that answer them {#answers}

| Need | Chapter | In one line |
|---|---|---|
| 1. A device that carries memory over | [Chapter 6](/en/story/operation#records) — department records, handoff | Finished work is recorded as its important facts; unfinished work is recorded so the next session continues with the same knowledge. |
| 2. Exact behavior as programs | [Chapter 2](/en/story/at-a-glance#accountability), [chapter 5](/en/story/how-it-is-kept#hooks) — hooks and scripts | Claude Code judges and proposes what to build as a program; policies that must hold are enforced by hooks and scripts. |
| 3. Token tracking and statistics | [Chapter 7](/en/story/verification#tokens) — token records | Used to watch the fixed cost of the delegation structure and the flow of work. |
| 4. Distribution with the same user experience | [Chapter 8](/en/story/distribution) | Policy, hooks and tools are distributed, not the organization. The policy layer carries what must be the same; the organization is left open to differ by user. |

| Problem | Chapter | In one line |
|---|---|---|
| 1. Skills and rules past management | [Chapter 3](/en/story/principles#solid), [chapter 5](/en/story/how-it-is-kept#governance) | Each role gets only the tools it needs; common policies are gathered into governance. |
| 2. Context eaten | [Chapter 3](/en/story/principles#solid) — interface segregation | Nothing is loaded by default; only what a role is granted is used, so unused tools take no context. |
| 3. The fatigue of learning new tools daily | [Chapter 4](/en/story/structure#three-staff) — asset staff | The asset staff reviews and approves tools. |
| 4. Uneven behavior | [Chapter 4](/en/story/structure#departments), [chapter 6](/en/story/operation#within) | The department's PM sets the plan and the Definition of Done, and checks results against them. |
| 5. Knowledge cut off between projects | [Chapter 9](/en/story/growth-and-limits#growth), [chapter 6](/en/story/operation#across) | Knowledge accumulates in retrospectives and the portfolio; the ops staff coordinates across departments. |
| 6. No way to check that a policy works | [Chapter 5](/en/story/how-it-is-kept#hooks), [chapter 7](/en/story/verification#audit) | Hooks block what must hold; whether it held is audited from real records. |

<SourceTable />

**Next.** → [2. The answer: borrow a company's structure](/en/story/at-a-glance)
