---
title: 6. Distribution and many tools — distributing policy, not the organization
---

# 6. Distribution and many tools

::: lead
What is distributed is policy, hooks and tools, not the organization; users shape the organization to their own taste.
The design supports many tools, but today it is implemented only for Claude Code and not yet tested on any other tool.
:::

The fourth need in [1. Background](/en/story/background) was "distributable to other people, with the same user
experience after it is distributed". And because tokens were always short, I also thought about "switching only the
tool while keeping the policy and memory". This page is about both.

## I turned the idea around: distribute policy, not the organization

::: point One of the reasons I built aise-core was that I hoped other people would put it to good use too.
:::

::: point But my experience with AI agents was that however the system prompt was composed, it never gave the same answer.
So keeping the policy is enforced by hooks, the scripts the hooks run, and policy documents, and within that, users can
compose an organization to their own taste.
:::

::: point The organization itself is worth distributing too, but I took it out of what is distributed. Instead, policy, hooks and tools are split into two use cases — "start with no organization" and "reuse an existing organization" — so that users can change things to their own preferences.
This is how it actually is:

- The organization's actual data (which departments and roles exist and what they did) lives in a separate repository,
  apart from aise-core.
- A fresh deployment starts with an empty organization. On the first entry into Operator mode only the essential base
  files are created; roles and retrospectives start empty.
- So what must be the same (keeping the policy) is handled by policy, hooks and scripts, and what may differ (the shape
  of the organization) is left to the user.

Sources: `schema/instance/README.md`, `knowledge/decisions/workspace/instance-data-location.md`
"2026-07-08 — instance-data-lives-outside-repo-git", `governance/MODE_POLICY.md` "Org schema vs. org instance"
(record exists, repository private).
:::

::: point But it has not yet been "distributed to someone else". I am the only person using this organization today. {#not-yet-distributed}
That the procedure for a new person to start with an empty organization is not yet complete is also written in the
first section of the reference page [Quick Guide](/en/quick-guide). Status: **designed · partly implemented · not yet
tested with another user**.
:::

## Many tools: designed · implemented on Claude Code · not yet tested on other tools

::: point The rules are written without any tool's vocabulary. Each tool's "adapter" provides what the rules need. {#adapters}
What an adapter must do is gathered in a single tool-neutral list of requirements — what to check, block, remind,
record and answer. A check script reports how many of them a given tool's adapter provides. This is the dependency
inversion of [4. Principles](/en/story/principles).
:::

::: point Today there is one adapter, for Claude Code; as of 2026-10-07 it provides 38 of the 39 requirements (the remaining one, secrets intake, is deferred as "build on first real need").
aise-core has not yet been run on any other tool. So this whole section is **not yet tested**.

Sources: `governance/adapter_requirements.yaml`, the output of `governance/adapter_check.py claude-code` (record
exists, repository private).
:::

::: point When aise-core is first opened in another tool, that tool's agent is told to run the adapter check first, and, if no adapter exists, to propose to the operator "let's build these first" before starting any work.
The tool-neutral entry document at the front of the repository (`AGENTS.md`) instructs this. A tool that can read the
rules but has nothing to enforce them may break them silently.
:::

::: point I did use the two earlier frameworks (`aise-workflow`, `aise-development`) on other tools, and learned their limits and problems then.
Based on that experience, I am pointing out possible problems in advance and preparing solutions in aise-core. The
adapter structure and the list of requirements an adapter must implement are examples of that.
:::

::: point What was found when trying other tools — **(to be filled after the experiment)**
When aise-core is actually run on another tool, the results will be written here. For now I do not write problems or
solutions by guessing.
:::

## This site is also being built while things are in progress

::: point aise-core has not yet reached an end or a maintenance stage. In strict order, building this site now might not be right, but I judged the two could go ahead together.
It is the same judgment as in [4. Principles](/en/story/principles): designing so that things can be extended when you
are "given only a start, with the end unknown". So this site's content changes along with aise-core.
:::

**Next.** → [7. Growth, results, limits](/en/story/growth-and-limits)
