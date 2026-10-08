# 2048 — integration notes

| Field | Value |
| --- | --- |
| Source | https://github.com/gabrielecirulli/2048 (ZIP supplied by the site owner, 2026-10-08) |
| Author | Gabriele Cirulli and contributors |
| License | MIT (`LICENSE.txt`). Font: Clear Sans by Intel, Apache-2.0 |
| Build step | None |
| External requests | None |
| Storage | `localStorage` (best score and saved game) |
| Isolation | `standard` (needs storage) |

## Review
- Plain HTML/CSS/JS, no `eval`, no network calls, no trackers.
- Links in the page footer point to the author's sites; the player sandbox blocks pop-ups, so they do nothing inside the site.

## Changes
- Removed the paragraph claiming "This site is the official version of 2048", which is not true for this copy. Everything else is unchanged.
- Not copied (not needed to play): `Rakefile`, `.jshintrc`, `CONTRIBUTING.md`, `.gitignore`, `style/*.scss`.
