# Chess — integration notes

| Field | Value |
| --- | --- |
| Source | https://github.com/attogram/chess (ZIP supplied by the site owner, 2026-10-08) |
| Author | Attogram Project; chess engine GarboChess-JS by Gary Linscott |
| License | MIT (`LICENSE`, copy in `LICENSE.txt`). GarboChess-JS is BSD-3-Clause; its license was not in the ZIP, so it was added from https://github.com/glinscott/Garbochess-JS as `GARBOCHESS-LICENSE.txt`. jQuery 1.8.2 and jQuery UI 1.8.24 are MIT (headers kept in the files) |
| Build step | None |
| External requests | None |
| Isolation | `standard` |

## Review
- No network calls or trackers. Inline `javascript:` links are the game's own UI.
- The engine runs on the main thread; while the computer thinks the page can pause briefly. Lower "Time per move" on slow devices.

## Changes
- None to the game files. Not copied: `.github/`, `.gitignore`, unused `js/jquery.js`.
