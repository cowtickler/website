# Volley Random: integration notes  (added at the owner's request; see the license issue below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/volley-random.html, only frames the game from https://77pen.github.io/p9/volley-random/. These files were downloaded from that address on 2026-10-20 (on the owner's PC, because the build machine cannot reach it). 75 files, about 2.5 MB; everything listed in the export's `offline.json` came back with no errors. |
| Author | RHM Interactive (published on twoplayergames.org). Made with Construct 3. Same developer and engine as Basket Random and Soccer Random |
| License | **None. Copyrighted game.** Neither site has a license or permission to copy it; soccerrandomx.bitbucket.io is an unofficial ad-supported mirror and 77pen.github.io is an unofficial copy |
| Thumbnail | `assets/thumbnails/volley-random.webp`, a screenshot of the game's menu (copyrighted art), 640x360 |

## Known license issue
This is an unofficial copy of a copyrighted game, hosted without permission, like Basket Random and Soccer Random. RHM Interactive could send GitHub a takedown request.

## Security review
- The download is a plain Construct 3 export: `index.html`, `data.json`, the Construct runtime (`scripts/c3runtime.js`, `main.js`, two worker scripts, support check), Box2D (`box2d.wasm`, `box2d.wasm.js`), the Opus audio decoder (`scripts/opus.wasm.js`, `opus.wasm.wasm`), 38 images and 21 sounds.
- No ad, analytics or game-portal SDK (no GameDistribution, Google or Poki code). The only outside links are the "MORE" button and logo (twoplayergames.org), construct.net, and browser download links in the "not supported" message. Nothing is loaded from other websites.
- Not copied: `sw.js` and `offline.json` (the export's offline service worker, as with Soccer Random). The game asks for `sw.js` once and gets a harmless "not found", so nothing is cached in the browser.
- Added a Content-Security-Policy to `index.html` so the page cannot contact other websites (same policy as Basket Random and Soccer Random).

## Changes made
- `index.html`: added the Content-Security-Policy and the 60-frames-a-second cap from Soccer Random (both marked `ArcadeHub:`), removed the original's "- topVAZ" title suffix. Measured on 2026-10-20 with a simulated 60, 120 and 144 Hz screen: without the cap the game ran 60, 120 and 144 ticks a second (up to 2.4 times too fast); with it, 60 on all three, the same as Basket Random and Soccer Random.
- **Speed (owner: "a bit too fast", 2026-10-21).** `window.ARCADEHUB_GAME_SPEED = 0.8` in `index.html`. The cap above now allows `60 x speed` game steps a second (48 at 0.8), so the players, ball and physics move at 0.8x on any screen (measured 48 steps a second at 50, 60, 75, 90, 120, 144, 165 and 240 Hz). Change the number to fine-tune it: 1 = original speed, 0.9 a little slower, 0.7 slower still. Values above 1 can't go faster than the screen refreshes. Below 1 the picture updates a bit less often (48 times a second at 0.8), which is barely visible.
- Nothing else was changed.

## Controls
Expected to match Soccer Random (same developer and series): W for player 1 (left team), Up arrow for player 2 (right team), tap on touch screens. "1P" plays the computer, "2P" a friend on the same keyboard. Not play-tested here; the owner does play-testing.
