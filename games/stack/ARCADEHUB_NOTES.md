# Stack: integration notes  (added at the owner's request; see the license note below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/stack.html, only frames the game from https://77pen.github.io/p2/stack/. These files were downloaded from that address on 2026-10-20 (on the owner's PC, because the build machine cannot reach it). 5 files, about 750 KB. |
| Author | Not named in the files (the page title says "Stack - topVAZ", the uploader). The code is a CodePen pen: it includes CodePen's helper script and its comments match the well-known CodePen "Stack" pen, most likely by Steve Gardner (2017). I could not open CodePen from the build machine to confirm the exact pen. |
| License | **Unclear, probably MIT.** CodePen says public pens are MIT licensed (https://blog.codepen.io/docs/licensing/), but this copy carries no license or credit. Libraries: three.js r83 (MIT), GSAP TweenMax 1.18.0 (GreenSock "standard no charge" license, fine for a free site). The Comfortaa font is under the SIL Open Font License (`fonts/OFL.txt`). |
| Thumbnail | `assets/thumbnails/stack.webp`, a screenshot of the game, 640x360 |

## Known license issue
The original author is not credited by the copy we downloaded, and the exact CodePen pen was not confirmed. If it is the public CodePen pen, MIT allows hosting it as long as the copyright notice is kept, so add the author's name and pen link here once confirmed. Takedown risk is low but not zero.

## Frame headers (checked 2026-10-20)
The owner asked for a copy stored in the repository, so the site does not depend on 77pen.github.io.

## Security review
- `index.html` holds all the game code (about 400 lines: a Three.js scene, blocks, score, GSAP tweens). No ads, analytics, trackers, network calls or storage.
- `three.min.js` and `TweenMax.min.js` are the stock libraries (version headers intact).
- The download also had `main.js`, CodePen's loop-guard helper (`window.CP`). The game never calls it, so it was left out.
- The only outside resource was the Comfortaa font from Google Fonts; it is now stored in `fonts/`.
- Added a Content-Security-Policy to `index.html` so the page cannot contact other websites.

## Changes made (all marked `ArcadeHub:` in `index.html`)
- Content-Security-Policy added. It allows `eval` because the page's original text-selection script uses `new Function`.
- Comfortaa font loaded from `fonts/comfortaa-latin.woff2` instead of Google Fonts.
- The 60-frames-a-second cap from Basket Random. The moving block steps a fixed distance per screen refresh, so without it the game ran too fast on high-refresh screens. Measured on 2026-10-20 with a simulated 60, 120 and 144 Hz screen: without the cap the block moved 60, 120 and 144 steps a second (up to 2.4 times too fast); with it, 60 on all three.
- Removed the `main.js` script tag and a tag for `/js/main.js` (a file missing on the original host too).
- Nothing else was changed. `stack.png` is the original page icon.

## Controls
Click, tap or press the spacebar to drop the moving block onto the stack. Overhanging parts are cut off; miss completely and the game ends.
