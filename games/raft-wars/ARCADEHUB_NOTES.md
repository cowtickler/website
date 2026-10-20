# Raft Wars: integration notes  (added at the owner's request; see the license issue below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/raft-wars.html, only frames the game from https://77pen.github.io/p/raft-wars/. These files were downloaded from that address on 2026-10-20 (on the owner's PC, because the build machine cannot reach it). 106 game files, about 8.3 MB. |
| Author | Martijn Kunst (originally a Flash game). This is the later HTML5 version made with Phaser 2.6.2, as published on Poki |
| License | **None. Copyrighted game.** Neither site has a license or permission to copy it; soccerrandomx.bitbucket.io is an unofficial ad-supported mirror and 77pen.github.io is an unofficial copy. The libraries inside are open source: Phaser (MIT), phaser-spine, Box2D plugin |
| Thumbnail | `assets/thumbnails/raft-wars.webp`, a crop of the game's menu screen (copyrighted art), 640x360 |

## Known license issue
This is an unofficial copy of a copyrighted game, hosted without permission, like Basket Random and Soccer Random. The author or Poki could send GitHub a takedown request.

## What it is
A plain HTML5 game, not Flash, so Ruffle is not needed. `index.html` loads Phaser, its Spine, BitmapText and Box2D plugins, `js/plugin-api-poki.js` and the game itself (`js/m.js`), which loads everything from `assets/` with relative paths.

## Security review
- The original `index.html` loaded an ad script (`https://script.4dex.io/localstore.js`), an empty `/cloak.js` and the Poki SDK (`/poki-sdk.js`, which loads `poki-sdk-core-v2.263.0.js`). The Poki SDK loads Google, Amazon, Prebid and other ad and tracking scripts. None of these were copied.
- `js/m.js` only talks to the Poki SDK through `js/plugin-api-poki.js`. It saves progress in `localStorage` under keys starting with `raftwars_v1_1-`. No other network requests, no `eval`, no links to other websites, no site lock. Its only page reload is when the screen is rotated on a phone.
- Added a Content-Security-Policy to `index.html` so the page cannot contact other websites.

## Changes made
- `index.html`: removed the ad script, `cloak.js` and the Poki SDK, added the Content-Security-Policy and `poki-stub.js` (marked `ArcadeHub:`), added `<meta charset>`, `<body>` and closed the tags. The game scripts and their order are unchanged.
- `poki-stub.js` (new): a small stand-in for the Poki SDK with the methods the game calls. Ads are gone, so the end-of-level bonus button gives its bonus straight away instead of after a video ad.
- Nothing in `js/` or `assets/` was changed.
- The source site has no MP3 copies of the sounds (all 77 gave "not found"), so only the OGG files are here. Chrome, Edge, Firefox and ChromeOS play them; very old Safari would have no sound.

## Speed on 120 Hz and 144 Hz screens
No speed cap was added. Unlike Basket Random and Soccer Random, Phaser 2.6.2 already runs the game logic on a fixed 60-steps-a-second clock no matter how fast the screen refreshes. Measured on 2026-10-20 with a simulated 60, 120 and 144 Hz screen: 60 game steps a second on all three (it only draws more often on faster screens).

## Controls
Mouse or touch: drag to aim and set the power, release to shoot. Buttons on screen for weapons, the shop and pause.
