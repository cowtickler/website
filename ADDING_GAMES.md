# Adding games

This guide is for you and for Claude Code. Every game on the site lives in its
own folder under `games/`, has one entry in `data/games.json`, and has a
thumbnail in `assets/thumbnails/`. Nothing else in the website needs to change.

## Ways to bring in a game

1. **Repository URL.** Tell Claude Code: *"Add this game: https://github.com/owner/repo"*.
2. **ZIP download.** On GitHub use *Code → Download ZIP*, extract it into
   `_incoming/<name>/` inside this project (that folder is git-ignored), and
   tell Claude Code where it is.
3. **Files you already have.** Put them in `_incoming/<name>/` the same way.

Never extract a download straight into `games/`. `_incoming/` is the review
area; only reviewed, working output is copied into `games/<game-id>/`.

## The integration checklist

Work through these steps in order. Stop and flag the game (see
[Flagging a game for review](#flagging-a-game-for-review)) if any step fails.

### 1. License and redistribution

Find `LICENSE`, `LICENSE.md`, `COPYING`, the README, `package.json`'s
`license` field, and any separate licenses for art, music, fonts or levels.

| License found | Can it go on the site? |
| --- | --- |
| MIT, BSD, ISC, Apache-2.0, Zlib, Unlicense, CC0 | Yes. Keep the license file and copyright notice. |
| GPL-3.0, GPL-2.0, AGPL, MPL-2.0 | Yes, but the source must stay available: keep the license and link the repository. Do not mix its code into the site's own files. |
| CC-BY, CC-BY-SA (often used for art/music) | Yes, with visible credit (the game page and credits page show it). |
| CC-BY-NC / "non-commercial" | Only while the site stays non-commercial (no ads, no paid access). Record this in the notes. |
| No license at all | **No.** "No license" means all rights reserved. Flag it. |
| "Free to play", "personal use only", "do not redistribute", unclear terms | **No.** Flag it. |
| Code is open but assets are separately licensed or unstated | Flag it until the asset terms are clear. |

Also check that the repository is the original (not a re-upload of someone
else's commercial game) and that it does not use trademarked characters or
ripped assets from commercial games.

### 2. Security review (treat the code as untrusted)

Before running it, read it. Look for:

- Network requests to other sites: `fetch(`, `XMLHttpRequest`, `WebSocket`,
  `navigator.sendBeacon`, `<script src="https://...">`, `import(` of remote URLs,
  analytics/ad/tracking snippets, crypto-miners.
- Access to the parent page or site data: `window.parent`, `window.top`,
  `document.cookie`, `localStorage` keys it does not own, `postMessage` to `*`.
- Obfuscated or minified code that has no readable source in the repository.
- `eval(`, `new Function(`, base64 blobs that get executed.
- Redirects: `location.href = 'https://...'`, `window.open(`.
- `package.json` install scripts (`preinstall`, `postinstall`) and unknown
  dependencies. Do not run `npm install` on a project you have not reviewed.

Remove ads and trackers only if the license permits modification; otherwise
flag the game. Note every finding in the game's `ARCADEHUB_NOTES.md`.

### 3. Will it run on GitHub Pages?

GitHub Pages serves static files only. The game must not need a server
(PHP, Node, Python, databases, multiplayer servers, server-side saves).

- Plain HTML/JS/CSS games: usable as they are.
- Games with a build step (Vite, webpack, Parcel, TypeScript): build once
  locally (`npm ci` then the project's build script, after the review above)
  and copy only the static output folder (`dist/`, `build/`, `public/`).
- Configure the build for relative paths so it works in a sub-folder, for
  example Vite `base: './'`, webpack `publicPath: ''` or `'./'`,
  Create React App `"homepage": "."`.
- Unity WebGL / Godot exports: check the total size (GitHub Pages limits a
  site to 1 GB and files to 100 MB) and mark them `"performance": "heavy"`
  unless tested on low-end hardware. Godot 4 web exports need special headers
  (SharedArrayBuffer) that GitHub Pages does not send, so prefer Godot 3 exports
  or Godot 4 builds without threads.

### 4. Copy into its own folder

```
games/<game-id>/
├── index.html        the game's entry page (any name works; set "entry")
├── ...               the game's own files, unchanged where possible
├── LICENSE.txt       the original license (keep the original file too)
└── ARCADEHUB_NOTES.md  where it came from and what was checked/changed
```

- `<game-id>`: lowercase letters, numbers and dashes, e.g. `space-blaster`.
- Keep every copyright notice, license file and credits file.
- If the license file has no extension (`LICENSE`), also save a copy as
  `LICENSE.txt` so browsers display it instead of downloading it.
- Do not rewrite a game that works. Only change what is needed to run here.

### 5. Fix paths

Inside the game, paths must be relative to its own folder.

- `src="/js/game.js"` → `src="js/game.js"` (a leading `/` points at the
  domain root and breaks on GitHub Pages sub-folders).
- Remove `<base href="/">` or change it to `<base href="./">`.
- Replace CDN links (`https://cdn...`) with local copies of the same files
  (check their licenses too), because the site does not load third-party
  scripts and the game should work offline.
- File names are case-sensitive on GitHub Pages (`Player.png` ≠ `player.png`)
  even though Windows does not care. Match them exactly.

### 6. Thumbnail

- 640x360 (16:9), WebP, ideally under 40 KB, saved as
  `assets/thumbnails/<game-id>.webp`.
- Use the game's own screenshot or artwork (allowed by its license), or make
  an original one. Do not use art from other games or search results.
- Without a thumbnail the site shows a generated placeholder, so a missing
  image never breaks the layout.

### 7. Catalog entry

Add an object to `"games"` in `data/games.json`:

```json
{
  "id": "space-blaster",
  "title": "Space Blaster",
  "description": "One or two sentences about the game.",
  "categories": ["action", "arcade"],
  "tags": ["shooter", "space", "retro"],
  "thumbnail": "assets/thumbnails/space-blaster.webp",
  "entry": "games/space-blaster/index.html",
  "aspectRatio": "16:9",
  "input": { "keyboard": true, "touch": false, "mouse": false, "gamepad": false },
  "fullscreen": true,
  "featured": false,
  "popular": false,
  "controls": [
    { "keys": "Arrow keys", "action": "Move" },
    { "keys": "Space", "action": "Shoot" }
  ],
  "compatibility": {
    "performance": "medium",
    "lowEnd": "unknown",
    "notes": "Anything players should know, e.g. needs a keyboard."
  },
  "isolation": "standard",
  "source": {
    "type": "third-party",
    "author": "Original Author",
    "authorUrl": "https://github.com/original-author",
    "repository": "https://github.com/original-author/space-blaster",
    "license": "MIT",
    "licenseUrl": "games/space-blaster/LICENSE.txt"
  },
  "added": "2026-10-08",
  "status": "ready"
}
```

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Unique; lowercase letters, numbers, dashes. Used in `play.html?id=`. |
| `title` | yes | Display name (max 80 characters). |
| `entry` | yes | Path to the game's HTML page, must start with `games/`. For a game with `"embeddable": false`, the official `https://` page instead. For a game framed from another website that allows it, that site's `https://` page; its origin must be listed in `externalOrigins` in `js/config.js` and in `frame-src` in `play.html`. The player then shows the game's title, a link to its source and a Reload button. |
| `description` | recommended | Not shown on the site right now; kept for the record and future features. |
| `categories` | optional | Ids from the `categories` list. Not shown right now; kept for future filters. |
| `tags` | optional | Not shown right now; kept for future search. |
| `thumbnail` | recommended | Relative path to the WebP icon shown on the homepage. |
| `aspectRatio` | optional | `"16:9"`, `"4:3"`, `"3:4"`… Letterboxes fixed-size games. Omit to fill the player. |
| `input` | yes | What really works (keyboard, touch, mouse, gamepad). Recorded for honesty and future filters. |
| `fullscreen` | optional | `false` hides the fullscreen button. Default `true`. |
| `titleBar` | optional | `true` makes the player's bar show the game's title, "by" its author (linking `source.authorUrl`, new tab) and a Reload button, for a local game whose owner asked for them (Papa's Freezeria and Papa's Pizzeria). Framed games always get them. Default `false`. |
| `openInPlayer` | optional | `false` makes the icon open `entry` as its own page instead of in the player, for a game that refuses to run inside a frame. Never patch out the game's frame check instead. Default `true`. |
| `embeddable` | optional | `false` for a game whose official site does not allow it inside other websites (`X-Frame-Options`, CSP `frame-ancestors`, a script check, or its terms). `entry` is then the official `https://` page. The icon still opens the player, which shows the game's title, credit and a button that opens the official page in a new tab, instead of a frame. Never proxy, re-host or work around the restriction. Default `true`. |
| `featured` | optional | Not used right now. |
| `popular` | optional | Not used right now. |
| `controls` | recommended | How to play. Not shown right now; most games explain their own controls. |
| `compatibility.performance` | recommended | `light`, `medium` or `heavy`. |
| `compatibility.lowEnd` | recommended | `good`, `fair`, `poor` or `unknown` (only claim `good` after testing). |
| `compatibility.notes` | optional | Honest limitations. |
| `isolation` | optional | `standard` (default; game can use storage) or `strict` (separate origin; safer, no storage). |
| `source.*` | yes | Credit and license. `type` is `original`, `third-party` or `external` (played on another site). `platform` names that site (for example `"Y8"`); the player then says "Play on Y8", or "from Y8" above a framed game. `url` is the game's own page on that site, when the framed `entry` is a different, embed-only page; the player's source link and Open Original Game use it. |
| `added` | optional | `YYYY-MM-DD`, used by "Newest" sorting. |
| `status` | optional | `ready` (shown), `review` or `disabled` (hidden and not playable). |

To add a category, add `{ "id": "rhythm", "name": "Rhythm" }` to
`"categories"`.

### 8. Test

1. `node tools/validate-catalog.mjs` (if Node.js is installed) shows 0 errors.
2. Run the local server and open the homepage: the icon appears and opens
   the game.
3. Open `play.html?id=<game-id>`: it loads with no errors in the browser
   console (`F12`), controls work after clicking into the game, fullscreen
   works, restart works, and the page does not scroll when using arrow keys.
4. Try a narrow window (or DevTools device mode) and touch if the game
   claims touch support.
5. Check the Network tab: the game makes no requests to other sites.
6. Make sure the other games still work.

### 9. Record what you did

Create `games/<game-id>/ARCADEHUB_NOTES.md` with the source URL and commit,
license, review findings, build commands, and every change you made (see
`games/neon-snake/ARCADEHUB_NOTES.md` for the format).

## Flagging a game for review

If the license is missing or unclear, the assets are questionable, the code
looks suspicious, or the game cannot run statically:

- Keep it in `_incoming/<game-id>/`, not in `games/`. Everything inside
  `games/` is uploaded to GitHub and served publicly even when its catalog
  entry is hidden; `_incoming/` is in `.gitignore`, so it never leaves the
  computer.
- Prepare it there anyway (fixed paths, `thumbnail.webp`,
  `catalog-entry.json`, `ARCADEHUB_NOTES.md` explaining the problem) so it can
  go live with a quick move once the problem is solved.
- Tell the site owner why it is on hold. Leave everything else unchanged.

## Removing a game

Delete its folder in `games/`, its thumbnail, and its entry in
`data/games.json`.
