# Tunnel Rush: integration notes  (added at the owner's request; see the license note below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/tunnel-rush.html, only frames the game from https://77pen.github.io/p/tunnel-rush/. That page loads its three big game files from https://tbg95.pages.dev/tunnel-rush/. These files were downloaded from those addresses on 2026-10-22 (on the owner's PC, because the build machine cannot reach them). 7 files, about 13 MB. |
| Author | "Tunnel Rush" by Royale Gamers (the build's `companyName`; contact address in the game data: ROYALEGAMERS25@gmail.com). The data file's original name is `tunnel_rush_gamedistribution_v9`, so it is the version made for GameDistribution; the 77pen.github.io copy is an unofficial re-upload. |
| Engine | Unity 2017.4.0f1 WebGL (WebAssembly), loaded by the old `UnityLoader.instantiate` with the `build.json` manifest. 256 MB heap. The game data and WebAssembly files are gzip-compressed; the loader unpacks them itself. |
| License | **None.** No license or permission to redistribute; all rights reserved by Royale Gamers. The owner asked for it anyway (2026-10-22), like the other soccerrandomx games, so it can be taken down if the makers ask. Bundled: Unity's own `UnityLoader2019.js`, fonts under the SIL Open Font License 1.1 inside the game data. |
| Thumbnail | `assets/thumbnails/tunnel-rush.webp`, a screenshot of the game's start screen, 640x360 |

## Security review
- The game has a built-in "SiteLock" check (its data contains "Game is sitelocked, contact ROYALEGAMERS25@gmail.com"). It did not trigger when the game was loaded from `cowtickler.github.io`: the start screen loaded and a run started and played normally. Nothing was changed to get around it. If the game ever shows that message instead of playing, the lock has started applying to this site and the game should be removed.
- `tunnel_rush_v9wasmframework.unityweb` (plain JavaScript) is Unity's runtime plus the game's plug-ins. The only ad hook is a `ShowBanner` function that calls `gdsdk.showBanner()` only if a GameDistribution SDK is already on the page. None is, so no ad code runs and no stand-in is needed.
- Unity's built-in analytics tries to contact `config.uca.cloud.unity3d.com` and `cdp.cloud.unity3d.com`. The Content-Security-Policy blocks both (harmless console errors).
- Unity keeps its save data (best distance) in IndexedDB (`/idbfs`), like every Unity WebGL game.
- No `window.parent`/`window.top` access, cookies, or outside scripts found.

## Changes made (all marked `ArcadeHub:`)
- `build.json`: the three game-file addresses on `tbg95.pages.dev` now point at the local copies next to it. The three asm.js fallback entries were removed: those files do not exist on the original host either (404) and are only for browsers without WebAssembly.
- `index.html`: Content-Security-Policy added so the page cannot contact other websites. It allows `eval` and `blob:` scripts because the Unity loader needs them.
- `index.html`: removed the `/cloak.js` script (an empty file at the root of the original site), the CSS rules for Unity's loading-screen images (missing on the original host too), and an unused progress function. The page background is black.
- Nothing else was changed. The game data and WebAssembly files are byte-for-byte the downloaded ones.

## Speed on high-refresh screens (checked 2026-10-22)
No 60-ticks-a-second cap is needed. Unity moves the game by elapsed time. Measured with a simulated clock on 60 and 144 Hz screens, 3 seconds into a run: 147.5 m at 79.9 m/s (60 Hz) and 145.9 m at 78.6 m/s (144 Hz). A frame-based game would have gone 2.4 times as far at 144 Hz.

## Performance
About 13 MB to download (cached by the browser afterwards) and 256 MB of memory while playing, so it is one of the heavier games on the site. Its graphics are simple flat-colored polygons, so it should be fine on the Dell Chromebook 3110, but that is a guess: it was not tried on the real device.

## Test notes
- Loads in a few seconds from a local server and reaches the start screen; the site tests (player, fullscreen, back button, no outside requests) pass.
- The test browser reports "Unable to decode audio data" for the game's sound clips: they are AAC, which the test browser (open-source Chromium) cannot play. Chrome and ChromeOS can.

## Controls
Left / Right arrow keys, or the on-screen arrows, rotate you around the tunnel to dodge the walls. Click or tap for the menus, pause and play again.
