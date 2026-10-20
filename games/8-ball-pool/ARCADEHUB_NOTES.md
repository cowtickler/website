# 8 Ball Pool: integration notes  (added at the owner's request, sped up to 2x; see the license issue below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/8-ball-pool.html, only frames the game from https://77pen.github.io/p8/8-ball-pool/. These files were downloaded from that address on 2026-10-20 (on the owner's PC, because the build machine cannot reach it). 110 files, about 5.8 MB. |
| Game | "8 Ball Billiards Classic" by Famobi (the game ID in `index.html`; the menu shows "© Famobi"). Made with Phaser 2.6.2 |
| Author | Famobi |
| License | **None. Copyrighted game.** Neither site has a license or permission to copy it; soccerrandomx.bitbucket.io is an unofficial ad-supported mirror and 77pen.github.io is an unofficial copy |
| Thumbnail | `assets/thumbnails/8-ball-pool.webp`, a screenshot of the game's table (copyrighted art), 640x360 |

## Known license issue
This is an unofficial copy of a copyrighted Famobi game, hosted without permission, like Basket Random and Soccer Random. Famobi could send GitHub a takedown request.

## Security review
- Files: `index.html`, `js/start.js` (Famobi loader and settings), `js/gameapi.js` (Famobi's game wrapper), `js/all.js` (Phaser and the game), `js/null.js` (an empty stand-in script), `json/country.json` and `json/user.json` (small stand-ins), 7 sounds, 5 bitmap fonts, 89 images.
- The 77pen copy had already switched the wrapper's ads off (`"ads":0`) and pointed its ad, analytics and IP-lookup addresses at the local `js/null.js` and `json/*.json` stand-ins. The wrapper still contains code for Google ads/analytics, Famobi's servers and socket.io, and links to famobi.com ("More games", app links).
- Added a Content-Security-Policy to `index.html` so the page cannot contact other websites (same policy as Basket Random and Soccer Random). Tested: no requests left the site while loading, in the menus and during a shot.
- Harmless errors from the copy: the wrapper asks for `assets/css/play.css` (404) and POSTs to `json/user.json` (fails on GitHub Pages too), and the game asks for the page background `assets/img/bgLarge.png`, which was not in the download (the area around the table stays black). The 7 `.mp3` sounds were missing at the source; the game uses the `.wav` copies.

## Changes made
- `index.html`: added the Content-Security-Policy and the game-speed setting (both marked `ArcadeHub:`).
- **Speed (owner asked for "2x speed": balls and gameplay twice as fast, 2026-10-20).** `window.ARCADEHUB_GAME_SPEED = 2` in `index.html`. Change the number to change the speed (1 = original, 1.5, 2, ...). The game moves the balls one fixed step per game update, so the setting runs `60 x speed` updates a second on a fixed clock (Phaser's `slowMotion` + `forceSingleUpdate = false`), on any screen. Ball physics is unchanged per step, so collisions, shot power and where balls end up are exactly the same, only twice as fast. Menus, animations and the computer's pauses before its shots keep real time. The in-game clock (`updateTimer`, which counts updates) is replaced with a copy that counts 1/speed per update, so it still shows real seconds and best times stay comparable.
- Phaser skips a frame's updates when their number rises two frames in a row; with 2x this happened constantly on 120 Hz screens (measured 104 instead of 120 updates a second), so the setting resets that check every frame. Phaser still caps it at 3 updates per frame, so on a device drawing under 40 frames a second the game runs a bit slower than 2x (but still faster than the original there).
- Measured on 2026-10-20 with simulated 60, 120 and 144 Hz screens: the original runs 60 updates a second on all three; with the setting, 120 on all three. The same test shot took 446 physics steps and 7.4 s originally and 3.7 s with the setting on all three screens.
- Nothing else was changed.

## Controls
- Mouse: move to aim, then hold the button on the table and drag back to set power; let go to shoot.
- Touch: drag on the table to aim, then drag the power cue on the left edge down and let go.
- "Person v computer" or "person v person" on one screen. Not play-tested here; the owner does play-testing.
