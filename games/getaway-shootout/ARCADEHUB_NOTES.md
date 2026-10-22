# Getaway Shootout: integration notes  (added at the owner's request; see the license note below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/getaway-shootout.html, only frames the game from https://77pen.github.io/p4/getaway-shootout/. These files were downloaded from that address on 2026-10-22 (on the owner's PC, because the build machine cannot reach it), plus four loader files the page took from the root of 77pen.github.io. About 19 MB. |
| Author | New Eich Games (the build's `company_name`; twitter.com/neweichgames is credited inside the game data). This is the version made for Poki (Poki's "unity-2020" page template and ad SDK); the 77pen.github.io copy is an unofficial re-upload. |
| Engine | Unity 2020.3.43f1 WebGL (WebAssembly, WebGL 1 or 2, no threads), uncompressed build files in `Build/`. 256 MB heap. |
| License | **None.** No license or permission to redistribute; all rights reserved by New Eich Games. The owner asked for it anyway (2026-10-22), like the other soccerrandomx games, so it can be taken down if the makers ask. The game data also carries the usual SIL Open Font License notice for a bundled font. |
| Thumbnail | `assets/thumbnails/getaway-shootout.webp`, cropped from the game's own Poki thumbnail (`934bde36-a4a1-43d0-8b35-30f15feddbb4.png`), 640x360 |

## Files
- `index.html`: the original page (it sets `window.config` for the loader).
- `unity-2020.js`: Poki's loading screen and Unity starter, originally `/unity-2020.js` at the host's site root. It shows `934bde36-...png` and `screenshots/` while loading, then starts `Build/`.
- `Build/`: the Unity loader, framework, data and WebAssembly files, unchanged.
- `StreamingAssets/Music.aac`: the game's music, which it loads by itself after starting (missing from the first download; fetched separately).
- `arcadehub-no-ads.js`: new, see below.

## Security review
- The original page loaded `/master-loader.js` from the host's site root, which loaded `/poki-sdk.js`, which loaded Poki's full ad SDK `/poki-sdk-core-v2.263.0.js`. That SDK contacts Poki (a.poki.com, api.poki.com, t.poki.io, geo.poki.io), Google ad servers (IMA, doubleclick), Amazon ads and several prebid ad exchanges. None of these files are included.
- `unity-2020.js` asked for Poki's "Torus" web font from a.poki.com; it only affects the loading text.
- Unity's built-in analytics tries to contact `config.uca.cloud.unity3d.com` and `cdp.cloud.unity3d.com`. The Content-Security-Policy blocks both, so nothing is sent (a few harmless console errors).
- The game's Poki plug-in (inside `Build/f5f926b8469fb93664d78809a76685ef.js`) only calls `PokiSDK` functions: loading progress, gameplay start/stop, between-round ads and rewarded ads.
- Unity keeps the game's save data (coins, unlocked characters) in IndexedDB (`/idbfs`), like every Unity WebGL game.
- No `window.parent`/`window.top` access, cookies, or site-lock checks found.

## Changes made (all marked `ArcadeHub:`)
- `index.html`: Content-Security-Policy added so the page cannot contact other websites. It allows `eval` and `blob:` scripts because the Unity loader needs them.
- `index.html`: the `/master-loader.js` tag (site-root path, which would not work in a sub-folder and pulled in Poki's ad SDK) is replaced by two local scripts: `arcadehub-no-ads.js` and the local copy of `unity-2020.js`.
- `arcadehub-no-ads.js` (new): a stand-in `PokiSDK` that shows no ads and fetches nothing. Between-round ads finish at once and rewarded ads grant their reward.
- `unity-2020.js`: the a.poki.com font address is removed (the loading text falls back to a local font).
- Nothing else was changed. The game data and WebAssembly files are untouched.

## Speed on high-refresh screens (checked 2026-10-22)
No 60-ticks-a-second cap is needed. Unity moves the game by elapsed time. Measured with a simulated clock on 60, 120 and 144 Hz screens: the round-start wipe and the score bar appearing happened at the same moments (wipe on screen at 0.5 s, gone by 1 s, score bar by 1.5 s) at all three rates, although 144 Hz drew 2.4 times as many frames.

## Test notes
- Loads in about 2 seconds from a local server and reaches the title screen; the menus, character select, controls screens and a two-player round start. The site tests (player, fullscreen, back button) pass. The only outside requests are Unity's analytics, which the Content-Security-Policy blocks.
- The test browser reports "Unable to decode audio data" and "Loading FSB failed" for each sound: the game's sounds are AAC, which the test browser (open-source Chromium) cannot play. Chrome and ChromeOS can, so this should not happen for players.
- Not play-tested on the Chromebook 3110. It is a 2D pixel-art game, so it should be lighter than most Unity games, but it still needs WebGL, about 19 MB of downloads and a 256 MB heap.

## Controls
One Player (against bots) or Two Player on one keyboard. Each player has two jump buttons: hold one to turn your character, let go to jump that way. A third button uses a power-up. Guns you pick up fire on their own. First to 3 getaways wins.
- Player 1: W / E jump left / right, R power-up.
- Player 2: I / O jump left / right, P power-up.
