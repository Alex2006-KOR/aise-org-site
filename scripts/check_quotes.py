#!/usr/bin/env python3
"""Check that the site's direct quotes of aise-core still occur verbatim in aise-core.

Upstream-drift check (DoD N-05, INV-1/INV-4). Stdlib only.

  python3 scripts/check_quotes.py --aise-core ../aise-core            # all docs pages
  python3 scripts/check_quotes.py --aise-core ../aise-core docs/x.md  # only these files
  python3 scripts/check_quotes.py --aise-core A --baseline B           # only quotes found in B but not in A

What counts as a quote: the site's direct-quote form, an italic double-quoted English span of 20+
characters (*"..."*), possibly across lines, outside fenced code blocks (mermaid labels are not quotes). A quote is split at ellipses ("...", "…") and each segment of 12+ characters must occur in
the corpus (CONSTITUTION.md, governance/, schema/, knowledge/, adapters/ text files), after normalizing
whitespace, emphasis/code markers (* and `), and typographic quotes on both sides.

Exit 0: every quote found. Exit 1: findings printed as `file:line  quote`.
With --baseline, only quotes that resolve against the baseline tree but not the current one are
reported — i.e. breakage caused by the upstream change, not quotes that were never verbatim (some quotes
are deliberately abridged; see docs/architecture.md §7).
"""
import argparse
import pathlib
import re
import sys

CORPUS_PARTS = ["CONSTITUTION.md", "governance", "schema", "knowledge", "adapters"]
TEXT_EXT = {".md", ".yaml", ".yml", ".txt"}
QUOTE_RE = re.compile(r'\*"([^"\n]*(?:\n[^"\n]*){0,6})"')
FENCE_RE = re.compile(r"^```.*?^```", re.S | re.M)
ELLIPSIS_RE = re.compile(r"\s*(?:\.\.\.|…|\[\.\.\.\])\s*")


def norm(s):
    s = s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    s = s.replace("*", "").replace("`", "")
    s = re.sub(r"\s*>\s+", " ", s)  # blockquote markers inside wrapped quotes
    return re.sub(r"\s+", " ", s).strip()


def load_corpus(root):
    root = pathlib.Path(root)
    chunks = []
    for part in CORPUS_PARTS:
        p = root / part
        files = [p] if p.is_file() else (sorted(p.rglob("*")) if p.is_dir() else [])
        for f in files:
            if f.is_file() and f.suffix in TEXT_EXT:
                try:
                    chunks.append(norm(f.read_text(encoding="utf-8")))
                except UnicodeDecodeError:
                    pass
    return "\n".join(chunks)


def quotes(path):
    text = path.read_text(encoding="utf-8")
    text = FENCE_RE.sub(lambda m: "\n" * m.group(0).count("\n"), text)
    for m in QUOTE_RE.finditer(text):
        q = m.group(1)
        if len(q) < 20 or not re.search(r"[A-Za-z]{3}", q):
            continue
        if re.search(r"[가-힣]", q) and not re.search(r"[A-Za-z]{4,} [A-Za-z]{2,} [A-Za-z]{2,}", q):
            continue  # Korean prose in quotes, not a quote of the English source
        line = text.count("\n", 0, m.start()) + 1
        yield line, q


def found(q, corpus):
    segs = [norm(s) for s in ELLIPSIS_RE.split(q)]
    segs = [s.strip(" .,;:") for s in segs if len(s.strip(" .,;:")) >= 12]
    return all(s in corpus for s in segs) if segs else True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--aise-core", required=True)
    ap.add_argument("--baseline", help="older aise-core tree; report only quotes broken since it")
    ap.add_argument("files", nargs="*")
    a = ap.parse_args()
    here = pathlib.Path(__file__).resolve().parent.parent
    files = [pathlib.Path(f) for f in a.files] or sorted((here / "docs").glob("*.md")) + sorted((here / "docs/en").glob("*.md"))
    files = [f for f in files if f.name != "architecture.md"]
    cur = load_corpus(a.aise_core)
    base = load_corpus(a.baseline) if a.baseline else None
    n = bad = 0
    for f in files:
        for line, q in quotes(f):
            n += 1
            if found(q, cur):
                continue
            if base is not None and not found(q, base):
                continue
            bad += 1
            print(f"{f}:{line}  {norm(q)[:160]}")
    print(f"{bad} finding(s) in {n} quote(s)", file=sys.stderr)
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
