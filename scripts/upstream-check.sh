#!/usr/bin/env bash
# Upstream-drift check: does the site still agree with aise-core? (DoD N-05, docs/architecture.md §7)
#
#   scripts/upstream-check.sh [AISE_CORE_DIR]      default: ../aise-core
#
# Reads the aise-core commit the site was last checked against from docs/architecture.md's
# `aise-core-through:` front matter, then reports on three axes:
#   1. references  — paths and decision citations that no longer resolve (aise-core's reference_check.py,
#                    plus a sweep for old one-file-per-decision names that reference_check skips)
#   2. quotes      — direct quotes that were verbatim at aise-core-through but no longer are
#   3. reading list — the rule documents and decision entries changed since aise-core-through: the part
#                    no script can judge (has a *described rule* changed?) — review these against the pages.
# Exit 1 if axis 1 or 2 has findings. After fixing and reviewing, raise aise-core-through in the same PR.
set -u
SITE="$(cd "$(dirname "$0")/.." && pwd)"
CORE="$(cd "${1:-$SITE/../aise-core}" && pwd)"
THROUGH="$(sed -n 's/^aise-core-through: *//p' "$SITE/docs/architecture.md" | head -1)"
[ -n "$THROUGH" ] || { echo "no aise-core-through in docs/architecture.md" >&2; exit 2; }
HEAD="$(git -C "$CORE" rev-parse --short HEAD)"
echo "aise-core: checked-through $THROUGH -> now $HEAD"
fail=0

echo; echo "== 1. references"
( cd "$CORE" && python3 governance/reference_check.py "$SITE"/docs/*.md "$SITE"/docs/en/*.md "$SITE"/docs/work/*.md ) || fail=1
# Old one-file decision names: a bare dated filename or knowledge/decisions/<date>-<slug>.md. Dated files under other
# folders (knowledge/evaluation/, knowledge/changes/) are current names, so a match must not continue a path.
old=$(grep -rnoP '(?<![\w/.-])(knowledge/decisions/)?20[0-9]{2}-[0-9]{2}-[0-9]{2}-[a-z0-9-]+\.md' "$SITE/docs" || true)
if [ -n "$old" ]; then echo "old-form decision filenames (map: aise-core knowledge/evaluation/*decisions-topic-migration*):"; echo "$old"; fail=1; fi

echo; echo "== 2. quotes broken since $THROUGH"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
git -C "$CORE" archive "$THROUGH" CONSTITUTION.md governance schema knowledge adapters | tar -x -C "$TMP"
python3 "$SITE/scripts/check_quotes.py" --aise-core "$CORE" --baseline "$TMP" || fail=1

echo; echo "== 3. reading list (changed since $THROUGH)"
git -C "$CORE" diff --stat=100 "$THROUGH" HEAD -- CONSTITUTION.md governance/*.md schema adapters/*/README.md | tail -n 40
echo "-- decision entries added:"
git -C "$CORE" diff "$THROUGH" HEAD -- knowledge/decisions | sed -n 's/^+## \(20[0-9-]* — .*\)/  \1/p'
exit $fail
