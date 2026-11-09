#!/usr/bin/env python3
"""Daily DSA counter updater for this portfolio site.
Fetches live solved counts from LeetCode (public GraphQL) and GeeksforGeeks
(public profile page) and rewrites ONLY the DSA totals in index.html.
Every pattern is anchored to its DSA label so unrelated stats
(years of experience, AWS certifications, project metrics) are never touched.
Exits quietly if a source fails: no change beats a wrong number."""
import json, re, sys, urllib.request

def fetch(url, data=None):
    req = urllib.request.Request(url, data=data, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")

def total_solved():
    q = {"query": 'query { matchedUser(username: "Aryanmouli") { submitStats { acSubmissionNum { difficulty count } } } }'}
    d = json.loads(fetch("https://leetcode.com/graphql", json.dumps(q).encode()))
    lc = {r["difficulty"]: r["count"] for r in d["data"]["matchedUser"]["submitStats"]["acSubmissionNum"]}["All"]
    html = fetch("https://www.geeksforgeeks.org/profile/aryanmov1z0")
    gfg = int(re.search(r"problems_solved\D{0,4}(\d+)", html).group(1))
    return lc + gfg

def main():
    try:
        total = total_solved()
    except Exception as e:
        print("stats fetch failed, leaving index.html unchanged:", e)
        return 0
    s = open("index.html", encoding="utf-8").read()
    s2 = re.sub(r'(<dt>DSA problems solved</dt><dd><span data-count=")\d+(")',
                lambda m: m.group(1) + str(total) + m.group(2), s)
    s2 = re.sub(r"(solved )[\d,]+\+( data structures and algorithms)",
                lambda m: m.group(1) + format(total, ",") + "+" + m.group(2), s2)
    s2 = re.sub(r"(Solved )[\d,]+\+( data structures and algorithms)",
                lambda m: m.group(1) + format(total, ",") + "+" + m.group(2), s2)
    s2 = re.sub(r"<b>[\d,]+\+</b>(<span>DSA problems solved</span>)",
                lambda m: "<b>" + format(total, ",") + "+</b>" + m.group(1), s2)
    if s2 != s:
        open("index.html", "w", encoding="utf-8").write(s2)
        print("updated DSA total to", total)
    else:
        print("already current:", total)
    return 0

if __name__ == "__main__":
    sys.exit(main())
