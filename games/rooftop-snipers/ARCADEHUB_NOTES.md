# Rooftop Snipers: integration notes  (added at the owner's request; see the license note below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/rooftop-snipers.html, only frames the game from https://77pen.github.io/p/rooftop-snipers. These files were downloaded from that address on 2026-10-22 (on the owner's PC, because the build machine cannot reach it). 7 files, about 8.6 MB. |
| Author | Rooftop Snipers by New Eich Games (Michael Eichler), per the build's company and copyright fields. The 77pen.github.io copy is an unofficial re-upload. |
| Engine | Unity WebGL, an older 2018/2019 build that runs as asm.js (not WebAssembly), loaded by `UnityLoader2019.js` with the `rooftop-snipers.json` manifest. The four `.unityweb` files are gzip files that the loader unpacks itself, so GitHub Pages needs no special headers. 256 MB heap. |
| License | **None.** No license or permission to redistribute; all rights reserved by its maker. The owner asked for it anyway (2026-10-22), like the other soccerrandomx games, so it can be taken down if the maker asks. |
| Thumbnail | `assets/thumbnails/rooftop-snipers.webp`, a screenshot of the game's title screen, 640x360 |

## Security review
- No ad SDKs, CDN files or site-lock checks.
- Unity's built-in analytics tries to contact `config.uca.cloud.unity3d.com` and `api.uca.cloud.unity3d.com` (and has `cdp.cloud.unity3d.com` built in). The Content-Security-Policy blocks them (harmless console errors).
- The title screen has a "Tweet your favorite customization" button (twitter.com) and an "Available on the App Store" button (itunes.apple.com). They only open a new tab when clicked. The game also checks for Kongregate's API, which is not present, so that does nothing.
- Unity caches the game files in IndexedDB (`UnityCache`) and keeps its save data in IndexedDB (`/idbfs`), like every Unity WebGL game.
- No `window.parent`/`window.top` access or cookies found.

## Changes made (marked `ArcadeHub:`)
- `index.html`: removed `<script src="/cloak.js">`. It pointed at the original host's site root (an empty file there); here it would have asked for a file at our own site root.
- `index.html`: Content-Security-Policy added so the page cannot contact other websites. It allows `eval` and `blob:` scripts because the Unity loader needs them.
- Nothing else was changed. The loading-screen images named in the page's CSS (progressLogo, progressEmpty, progressFull, webgl-logo, fullscreen) were missing on the original host too and are never shown.

## Speed on high-refresh screens (checked 2026-10-22)
No 60-ticks-a-second cap is needed. Unity moves the game by elapsed time (`Time.deltaTime`, and fixed-step physics). Measured with a simulated clock on 60, 120 and 144 Hz screens, the game drew more frames per second at the higher rates but did not move faster: on the ready-up screen the clouds drifted 56 px per half second at 60 Hz and 40 px at 120 Hz (clouds get random speeds); a frame-based game would have moved about twice as far at 120 Hz.

## Test notes
- Loads in about 25 seconds in the test browser (software graphics) from a local server and reaches the title screen; One Player / Two Player menu and the two-player ready-up screen work. The site tests (player, fullscreen, back button, no outside requests besides the blocked analytics) pass.
- asm.js builds are slower to start than WebAssembly ones; on the Chromebook 3110 the first load may take a little while.

## Controls
- Player 1 (red): W to jump, hold E to raise the weapon and let go to shoot.
- Player 2 (blue): I to jump, hold O to raise the weapon and let go to shoot.
- Push your opponent off the roof. One Player mode plays against the computer.
- Mouse for the menus.
