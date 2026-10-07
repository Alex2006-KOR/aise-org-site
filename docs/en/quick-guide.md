---
title: Quick Guide — Actually Using It
---

# Quick Guide — actually using it

::: lead
A practical reference you can follow without reading the explanations: only what to type now, in order.
:::

<div class="aise-ref-note">

This page is **reference material**. It continues from [2. At a glance](/en/story/at-a-glance) in the story track. The front page is the [Briefing](/en/).

</div>


::: tip This chapter is different
The four categories before this one were explanations meant to help you **understand** AISE. This
chapter is a **hands-on reference for people who actually want to use it** — you can follow it
without reading all of that first. It only lists, in order, "what do I type now." Why each step
looks the way it does is on the linked explanation pages.
:::

## Before you start

- **What you need** — the AI coding tool Claude Code, and the `aise-core` repository. Everything
  that currently binds AISE to Claude Code lives in `adapters/claude-code/` and `.claude/` (slash
  commands and hooks).
- **One honest caveat up front** — `instance/`, which holds this organization's actual members and
  department records, is **a separate repository** from `aise-core`, so it doesn't come along when
  you clone. `governance/DEPLOYMENT_READINESS.md` itself records that the procedure for standing up
  a new organization from an empty `instance/` hasn't been decided yet. The steps below assume **a
  deployment that already has an `instance/`** (like the one that built this site).
- **Conversation language** — the first time you declare a mode, it asks once which language to
  converse in and remembers it in `.aise/language`. The organization's own files stay in English
  regardless.

## 1. To get work done — `/aise:op`

Open a Claude Code session and type:

```text
/aise:op
```

What that one line does (`.claude/commands/aise/op.md`):

1. This session's mode is recorded as `op` (Operator). Without this declaration, writes to
   protected paths are blocked.
2. If any member role definitions are missing, a script (`realize_role.py`) regenerates them.
3. The mode-entry checklist (`schema/op_mode_entry_checks.yaml`) runs in full, every time, and
   reports its results.
4. This session becomes `OP_ORCHESTRATOR` (Ops-staff) and reads its own operating manual end to end.

From there, just **write what you want done in plain words.** You don't need to name a department —
Ops-staff decides that. Why you only ever talk to Ops-staff is in
[How to hand work to this org](/en/usage).

## 2. To start a project (department)

When you describe something new, Ops-staff first checks whether it **actually needs to be delegated
to someone**. If it's just a question, it answers directly without creating a department
(`schema/OP_ORCHESTRATOR.md` §3).

If it does need delegating, a department gets created.

| What appears | Where |
|---|---|
| A new line in the department list (`project-id`, status) | `instance/workspace/index.yaml` |
| The department's three record files | `instance/workspace/<project-id>/execution.md`, `directive.md`, `project-record.md` |

- A department usually starts as `draft`. If the intent is already clear and the scale is gauged,
  it may start straight away as `active`.
- When moving from `draft` to `active`, Ops-staff **asks "shall we actually start now?"** Your
  answer is the go-ahead (why it asks instead of switching automatically is in the decision box on
  [How to hand work to this org](/en/usage)).
- If a needed role doesn't exist yet, recruitment happens, judged by `HR_ORCHESTRATOR` (HR-staff).
  Changing or firing an existing role is also HR-staff's own call, with no user approval — it is
  reported in Ops-staff's status briefing instead.

## 3. While it's running

| What you want | How |
|---|---|
| See what state the departments are in | Ask Ops-staff something like "give me the department status" — it reads `index.yaml` and summarizes the `draft`/`active`/`ended` departments |
| Give a follow-up instruction | Just tell Ops-staff — if that department's PM isn't running right now, it's written into that department's `directive.md` and absorbed by the next PM run |
| Approve something hard to undo | For things like public deployment or merging into `main`, the department stops at the PR; you do the merge |
| See cost and delegation structure | `/aise:usage` — reconstructs this session's token usage and who delegated what to whom (the execution graph) from the real on-disk record |

## 4. Before the session drops — `/aise:handoff`

Type this before context runs out or you step away:

```text
/aise:handoff
```

- In Operator mode, it leaves the current situation **as one entry in that department's
  `directive.md`**. The next PM run reads it and moves it into its own record.
- In Meta mode, it leaves a handoff record in `continuity/`.
- It doesn't summarize; it filters down to "what still needs judgment" — why is in
  [Carrying on across sessions](/en/handoff).

## 5. To change the organization itself — `/aise:meta`

Use this only when you want to design a new role, or change rules or workflows.

```text
/aise:meta
```

- This session becomes `MG_ORCHESTRATOR` (Management-staff), and if `continuity/` has unfinished
  work, it briefs you on that first (`.claude/commands/aise/meta.md`).
- The protected core paths (constitution, schema, governance, etc.) can only be changed in this
  mode. Conversely, this deployment's own `instance/` data stays off-limits even in Meta mode.
- Even in Meta mode, it checks with you before adding anything to the organization that only works
  in one specific AI tool. The full distinction is in [Operator vs Meta Mode](/en/operator-vs-meta-mode).

## 6. To finish

**You decide** when a department ends. A PM never ends its own department — only you can judge
"does this result meet my intent." Tell Ops-staff to wrap it up; the PM writes the final report in
`execution.md`, the department becomes `ended` once Ops-staff confirms it, and `closed` once
Ops-staff has finished the retrospective (reviewing whether any lesson is worth reusing)
(`schema/README.md` "Department lifecycle", [Lifecycle](/en/lifecycle)).

## On one page

| Step | What you type / do |
|---|---|
| 1 | `/aise:op` |
| 2 | Say what you want done, in plain words |
| 3 | Answer when asked whether to start |
| 4 | Review and merge the PRs departments open |
| 5 | `/aise:handoff` before the session drops |
| 6 | `/aise:meta` when changing the org itself |
| 7 | Tell Ops-staff to end it when you're done |

If a term is unfamiliar, they're all collected in the [Glossary](/en/glossary).

*Source: `.claude/commands/aise/{op,meta,handoff,usage}.md`; `schema/OP_ORCHESTRATOR.md` §3;
`schema/README.md` "Storage", "Department lifecycle"; `governance/MODE_POLICY.md`;
`governance/DEPLOYMENT_READINESS.md`.*
