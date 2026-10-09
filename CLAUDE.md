# ArcadeHub — notes for Claude Code

Static HTML5 gaming website for GitHub Pages. Vanilla HTML/CSS/JS, no
framework, no build step, no backend. Read `README.md` for the overview and
`ADDING_GAMES.md` before integrating any game.

## Rules

- Never `git push`, publish, or change repository visibility without the
  owner's explicit approval in the current conversation.
- Keep every URL relative (no leading `/`). The site is served from a
  sub-path like `https://username.github.io/gaming-website/`.
- The game catalog is `data/games.json`. Do not hardcode games anywhere else.
- Insert catalog text with `textContent` / `AH.ui.el`, never `innerHTML`.
- Keep pages light for a 4 GB Chromebook (Dell 3110): no frameworks, web
  fonts, trackers, blur effects, or always-running animations.
- Third-party game code is untrusted. Review license and code (ADDING_GAMES.md
  steps 1–2) before running, building or deploying it. Do not run
  `npm install` on an unreviewed project.
- Never remove copyright notices or license files. Do not rewrite working games.
- Only list games that actually work. Use `"status": "review"` for anything
  flagged, and tell the owner why.
- Do not modify files outside this project folder.

## Adding a game (summary)

1. Download or locate it under `_incoming/` (git-ignored).
2. License check → security review → static/GitHub Pages check → build if needed.
3. Copy the playable output to `games/<game-id>/` with its license, fix paths.
4. Thumbnail `assets/thumbnails/<game-id>.webp` (640x360).
5. Catalog entry in `data/games.json`, honest `input` and `compatibility`.
6. `games/<game-id>/ARCADEHUB_NOTES.md` with source, license, findings, changes.
7. `node tools/validate-catalog.mjs`, then test in a local server
   (`python -m http.server 8000`): icon, player, controls, fullscreen,
   console errors, no external requests, other games still work.

## Design

The owner wants the site minimal: the homepage shows only the game icons and
names, and the player shows only the game plus a back and a fullscreen button.
Do not add headers, search, categories, favorites or other UI unless asked.

## Code map

- `js/config.js` settings · `js/ui.js` helpers · `js/games.js` catalog,
  validation, tiles · `js/app.js` homepage · `js/player.js` player
- Styles and colors: `css/style.css`.
- Script order on each page: config → ui → games → page script.
- Games with license problems wait in `_incoming/` (git-ignored, never
  published); see their `ARCADEHUB_NOTES.md`. Exception: the owner chose to
  publish Minesweeper, Pac-Man, Fireboy & Watergirl and Cookie Clicker anyway
  (2026-10-08); keep their notes. The owner removed Subway Surf and Subway
  Surfers on 2026-10-09.
- A game that refuses to run inside a frame gets `"openInPlayer": false`
  (it opens as its own page). Never patch out a game's frame check.
- A game whose official site does not allow embedding gets `"embeddable":
  false` with its official URL as `entry`; the player shows a button that opens
  it in a new tab. Never proxy, re-host or work around the restriction.
  (Unused since the owner removed Subway Surfers on 2026-10-09.)
