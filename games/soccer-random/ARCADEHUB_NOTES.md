# Soccer Random: integration notes  (added at the owner's request; see the license issue below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/, only frames the game from https://77pen.github.io/p8/soccer-random/. These files were downloaded from that address on 2026-10-20 (on the owner's PC, because the build machine cannot reach it). 56 files, about 2.3 MB. |
| Author | RHM Interactive (published on twoplayergames.org). Made with Construct 3. Same developer and engine as Basket Random |
| License | **None. Copyrighted game.** Neither site has a license or permission to copy it; soccerrandomx.bitbucket.io is an unofficial ad-supported mirror and 77pen.github.io is an unofficial copy |
| Thumbnail | `assets/thumbnails/soccer-random.webp`, a screenshot of the game (copyrighted art), 640x360 |

## Known license issue
This is an unofficial copy of a copyrighted game, hosted without permission, like Basket Random. RHM Interactive could send GitHub a takedown request.

## Frame headers (checked 2026-10-20)
77pen.github.io sends no X-Frame-Options or Content-Security-Policy, so it could also be framed. The owner asked for a copy stored in the repository, so the site does not depend on that host.

## Security review
- The download is a plain Construct 3 export: `index.html`, `data.json`, the Construct runtime (`scripts/c3runtime.js`, `main.js`, two worker scripts, support check), Box2D (`box2d.wasm`, `box2d.wasm.js`), 29 images and 15 sounds.
- No ad, analytics or game-portal SDK (no GameDistribution, Google or Poki code), unlike the Basket Random ZIP. The only outside links are the "MORE" button and logo (twoplayergames.org), construct.net, and browser download links in the "not supported" message. Nothing is loaded from other websites.
- `scripts/register-sw.js` would register `sw.js`, which the original host does not have either; it is not called on load, so nothing happens.
- Added a Content-Security-Policy to `index.html` so the page cannot contact other websites (same policy as Basket Random).

## Changes made
- `index.html`: added the Content-Security-Policy and the 60-frames-a-second cap from Basket Random (both marked `ArcadeHub:`). The two games share the same project setup, so Soccer Random would also run too fast on 120 Hz and 144 Hz screens without it. Measured on 2026-10-20 with a simulated 60, 120 and 144 Hz screen: without the cap the game ran 63, 125 and 156 ticks a second (up to 2.6 times too fast); with it, 60 on all three, the same as Basket Random.
- Nothing else was changed.

## Controls
W: player 1 (left team) jumps and kicks. Up arrow: player 2 (right team). "1P" plays the computer, "2P" a friend on the same keyboard. Touch screens: tap.
