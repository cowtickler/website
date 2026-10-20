# Water Color Sort: integration notes  (added at the owner's request; see the license note below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/water-color-sort.html, only frames the game from https://77pen.github.io/p3/water-color-sort/. These files were downloaded from that address on 2026-10-20 (on the owner's PC, because the build machine cannot reach it). 152 files, about 8.3 MB. |
| Author | Vnstart LLC (https://vnstart.com/). The code names their app (`com.vnstartllc.sort.water`) and links their Google Play and App Store pages and privacy policy. The 77pen.github.io copy is a re-upload of their game with Poki's ad SDK added. |
| Engine | Cocos Creator 2.4 web-mobile build (`cocos2d-js-min.65564.js`, MIT-licensed engine). |
| License | **None.** No license or permission to redistribute; all rights reserved by Vnstart LLC. The owner asked for it anyway (2026-10-20), like Soccer Random, so it can be taken down if Vnstart asks. Bundled npm libraries inside `assets/main/index.bd586.js` (elliptic, browserify-sign, jsonwebtoken, lodash.*) are MIT. |
| Thumbnail | `assets/thumbnails/water-color-sort.webp`, cropped from the game's own rules screen, 640x360 |

## Security review
- `assets/main/index.bd586.js` is the game code plus bundled libraries. Its only outside address used at runtime is `https://api.vnstart.com/validate-subscription`, a purchase check that runs only in the Android/iOS apps (it needs an app-store receipt); in a browser it returns before sending anything. The Content-Security-Policy would block it anyway.
- Store and privacy-policy links appear only in settings/rate pop-ups (they open in a new tab if clicked).
- Saves progress (level, coins, tubes, undos) in `localStorage`.
- No analytics, trackers, `eval` of downloaded code, or access to the parent page.

## Changes made
- `index.html`: Content-Security-Policy added so the page cannot contact other websites (it allows `eval` because the Cocos engine needs it).
- `index.html`: the original loaded `/poki-sdk.js` from the host's site root, which then downloaded Poki's ad SDK. It now loads `arcadehub-no-ads.js` (new file) instead: no ads are shown, nothing is fetched, between-level ads finish at once, and the "Watch ad / FREE" buttons (extra tube, undos, coins) give their reward straight away. It also resumes the game sound, which the game pauses before an ad and never resumes itself.
- `src/assets/utils/lodash.d8e4b.js` was missing on the original host but the game needs it (it uses the global `_`); without it the game never gets past loading. It is lodash 4.17.21 (`lodash.min.js` from npm, MIT, license in `src/assets/utils/LODASH-LICENSE.txt`).
- Not copied: `poki-sdk.js` from the host's site root.
- Nothing else was changed.

## Speed on high-refresh screens (checked 2026-10-20)
No 60-ticks-a-second cap is needed. The Cocos engine moves everything by elapsed time: on simulated 60, 120 and 144 Hz screens the engine ran 60, 120 and 144 frames a second, and a 10-second engine animation ran at 0.99x to 1.00x real time on all three. Only the loading bar fills faster on fast screens.

## Controls
Click or tap a tube, then the tube to pour into. Water only pours onto the same color or into an empty tube. Buttons: settings, shop, restart level, extra tube, undo.
