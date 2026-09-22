---
title: Carrying on across sessions
---

# Carrying on across sessions

::: tip Where you are — In Practice (2/2)
The last page in the [In Practice](/en/in-practice) category. If
[How to hand work to this org](/en/usage) followed how a unit of work **begins**, this page covers
**what's left once it's over**. That completes everything you need to actually use this
organization; the next category, [Evaluation & Value](/en/value), is the wrap-up.
:::

We're back to the problem raised on [Home](/en/). Sessions end. Sometimes by hitting a context
limit, sometimes just by closing the window. This page shows, file by file, **what actually
survives that.**

## The session ends, the department doesn't

First a distinction. **A run ending** and **a department ending** are different things. One
department exists across many independent PM runs, and those runs share no memory with each other.

So "continuity" in this organization is neither anyone's memory nor a conversation history — it's
**three files inside the department's directory.**

```
instance/workspace/<project-id>/
├── execution.md       ← PM writes, 업무참모 reads (the lightweight digest)
├── directive.md       ← 업무참모 writes, PM reads (unabsorbed instructions)
└── project-record.md  ← PM writes, PM reads (the department's own core record)
```

Each file has **exactly one writer.** That's the core of this design, and there was an incident
behind it becoming so.

## Why the files were split in three

::: info Revisiting the decision — the rule alone didn't hold, so we bolted on a mechanical gate
**Problem.** 업무참모 had, several times, written **directly** into a department's
`project-record.md`. Not out of malice — it was the natural move. A decision would be reached in
direct conversation with the operator, and with no PM run alive at that moment, that looked like
the only place to put it. The operator's objection wasn't "the staff figure may never write
anything," but this: a real chief-of-staff figure **doesn't personally edit an individual team's
working documents.** They synthesize, decide, and direct — and the team records it in its own
words.

**Investigation.** The cause was located in the structure rather than in one lapse —
*"`project-record.md` being one large document that PM, 업무참모, and ... 인사참모 all write into
was identified as the actual root of the recurring boundary blur — not carelessness on any one
occasion."* It also turned out there was already a good precedent: a narrow digest channel that
PM writes and 업무참모 reads existed — **only the opposite direction was missing.**
(Source: `knowledge/decisions/2026-08-26-report-directive-channel-split.md`)

**Resolution.** One directory was split into **three files, each with exactly one writer**: the
digest going up, the instruction inbox coming down (`directive.md`, newly created — the **only**
file 업무참모 may write inside a department), and the core record only the PM reads and writes.
The inbox deliberately keeps no archive section — that would just recreate inside it the very
bloat we were splitting to avoid. Instead, when the PM absorbs an instruction it must leave **one
Ledger row quoting it close to verbatim**, so the original wording is preserved exactly once, in
the place already designed for permanent history.

And then, **that same day, the very party who made the rule broke it.** 업무참모 wrote directly
into another department's `project-record.md` anyway, caught only because the operator asked "did
you just instruct the PM to do that?" The diagnosis wasn't a technical failure — the rule text was
intact and got quoted back correctly the instant it was checked. It was simply **an ingrained
habit beating a rule created minutes earlier.** The decision document generalized the
vulnerability class like this — *"a freshly-written rule losing to accumulated in-context habit
before an agent thinks to check it."*

**The strength that followed.** Instead of restating the rule more loudly, we bolted on a
**mechanical gate**: a write to those two files is denied unless the calling agent's type is PM.
And the incident left a more general lesson — **a boundary this organization genuinely cares about
is not enforced by expecting the actor to remember to check it.** A mode gate already existed on
the same logic, and this incident confirmed that precedent once more.
:::

For the record, the file called `report.md` in the decision above was renamed to **`execution.md`**
two days later. A PM run got blocked for real, which is how we discovered that the execution
tool's built-in guard denies writing a *new* file whose name contains "report"; several candidate
names were tested directly to map the collision before settling on a name where the
"directive → execution" pairing reads naturally.
(Source: `knowledge/decisions/2026-08-28-report-md-renamed-execution-md-harness-collision.md`)

## `/aise:handoff` — writing it down before you stop

When a session looks about to end (or a chunk of work simply wraps), you call `/aise:handoff`.
The command reads the current mode and branches on its own to decide which kind of record to
write — in Operator mode, that department's `directive.md`; in Meta mode, a separate handoff
record.

The important part is that this command **does not ask for a summary.**

::: info Revisiting the decision — filter, don't summarize
**Problem.** One early handoff record, checked later against the raw transcript, turned out to
have **quietly lost content when it was written.** A preceding strategic discussion had been
compressed away entirely, and the original narrow item had been **overwritten under the same
label** by a larger topic the operator raised afterwards.

**Investigation.** Tracing why exposed a flaw in the procedure itself, not a one-off mistake. The
old protocol asked for *"compress the whole conversation into a summary"* — and that compression
happens **at the worst possible moment** (context already low, sometimes mid-failure), **exactly
once**, performed by **the same degraded agent that has no way to verify its own compression.**
Under those conditions any session eventually produces the same failure.
(Source:
`knowledge/decisions/2026-07-10-continuity-handoff-format-redesigned-around-filtering.md`)

**Resolution.** "Summarize" was dropped for **"filter."** Four things went in together.
① **Anything already decided and applied is never re-described** — that gets a pointer (a commit
hash, a decision filename), and uncompressed detail is reserved for **the things that have no
other record at all** (open questions, completed work carrying a caveat). ② Each open item keeps
its own **stable slug**, so later content can't silently overwrite earlier content. ③ A mandatory
verification pass before finalizing: **re-read the actual recent conversation, not from memory**,
and check the draft against it. ④ Once a trigger fires, **writing the record takes priority over
other work** — a direct response to what actually happened, where the session kept going after a
signal until a tool call corrupted mid-flight and forced the handoff.

**The strength that followed.** The test became very simple — **not "did the code change" but
"is there any judgment left."** A check that produced no diff at all needs one line if nothing
is left to judge; a fully applied change still needs full detail if a caveat remains. As a bonus,
this is also when the mechanism for a session to sense and report its own remaining context came
into being.
:::

## The next run doesn't "inherit," it re-derives

This is where the organization diverges most sharply from the usual way.

In most agent systems, "carrying on" means **handing the in-progress context straight over.**
AISE doesn't do that. A new PM run inherits none of the previous run's reasoning; it **reads the
three record files and re-derives everything from scratch, in its own way.**

That looks like a loss but turns out to be a gain, and that story is in the last box on
[Philosophy](/en/philosophy) — in short, a stronger model picking up someone else's in-progress
reasoning trajectory recovers less than half the benefit of running strong from the start, and
AISE restarts not from a trajectory but from **a status document written for a human to read**, so
that situation structurally can't arise.

It isn't free, though. Re-deriving also means **not accepting the previous record as the right
answer.** And why that matters, the department that built this site learned the hard way.

## We nearly lost things exactly like this

Everything below is actually recorded in the Ledger of the `aise-org-site` department's own
`project-record.md` — **the department that builds this site.** These aren't invented examples.

**① A run that died with the edits done but nothing committed.** One PM run finished work on four
pages, wrote "complete" into the Plan, and was then cut off by an account limit (429). The next
run arrived to find **the record claiming completion with not a single commit** — finishing the
file edits and finishing the slice had turned out to be different events. That run verified,
committed, and closed it out, and the department nailed down a new convention in the process: **a
"complete" marker is trusted only when a commit hash is written beside it.** Between stateless
runs, a commit hash is the only evidence that can tell the difference.

The same verification pass threw off byproducts. Rather than trusting a member's deliverable, the
run read it directly — and found a leftover temporary block whose content was literally
`Remove Before Commit`, plus, on another page, a diagram depicting **old content that contradicted
a constitutional clause amended in the meantime.** Both would have shipped had the self-report
been believed.

**② Checkpoints lagging behind reality — not once but four times.** This department's record
repeatedly said "PR awaiting merge" when, on directly checking the repository before starting, the
next run found it **already merged.** It happened again in the very run that wrote this page — the
record said "the English translation isn't live yet," when in fact a promotion PR had been merged
in the meantime and it was already public.

Which is why this department's run-start procedure carries a hard rule: **a checkpoint is a
snapshot of the moment it was observed, not the current state** — when the record and the actual
repository disagree, the actual state is always right.

**③ And one thing records can't solve.** Recorded honestly. On 17 September 2026, feedback the
operator produced by reading this very site landed in `directive.md` as an instruction — and
**nothing happened for five days.** The inbox worked perfectly and the content was intact. But
**no PM run was ever launched to read it.** (This page exists because that instruction finally
got executed.)

The boundary that reveals is clear. **A record cannot execute itself.** A Project Record perfectly
preserves "what the next execution needs to know," but guarantees nothing about "when the next
execution happens" — that remains the layer above's job, and in this case that layer had a gap.
No other case shows the strengths and the limits of the continuity mechanism this precisely, which
is why the department recorded it itself and why it's reproduced here.

## Quick guide

**In one sentence.** Continuity in this organization is not a conversation history but **three
files with exactly one writer each**, and the next execution doesn't inherit them but **reads and
re-derives** — which is why even a "complete" written in the record isn't believed without a
commit hash.

**Want to check it yourself.**
- `schema/README.md`'s "Storage" — the exact role and format of the three files
- `governance/CONTINUITY_POLICY.md` — the filtering rule in its original wording
- `.claude/commands/aise/handoff.md` — the five steps `/aise:handoff` actually performs
- `instance/workspace/aise-org-site/project-record.md` — the original record behind cases ①②③
  above. You can read exactly how the department that built this site wrote down its own mistakes

**Next.** The final category, revisiting what this structure actually produced →
[Evaluation & Value](/en/value).

*Source: `schema/README.md` ("Storage", "Department lifecycle") /
`governance/CONTINUITY_POLICY.md` / `.claude/commands/aise/handoff.md` /
`knowledge/decisions/2026-07-10-continuity-handoff-format-redesigned-around-filtering.md` /
`knowledge/decisions/2026-08-26-report-directive-channel-split.md` /
`knowledge/decisions/2026-08-28-report-md-renamed-execution-md-harness-collision.md` /
`knowledge/decisions/2026-09-08-stateless-pm-sidesteps-handoff-tax.md` /
`instance/workspace/aise-org-site/project-record.md` (Ledger).*
