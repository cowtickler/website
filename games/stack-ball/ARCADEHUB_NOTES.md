# Stack Ball: integration notes  (added at the owner's request; see the license note below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/stack-ball.html, only frames the game from https://77pen.github.io/p9/stack-ball/. These files were downloaded from that address on 2026-10-21 (on the owner's PC, because the build machine cannot reach it). 10 files, about 7 MB. |
| Author | "Stack Ball 2" by DMA (the build's `companyName`); the loading screen showed a "Roro8" studio logo (roro8.com). It is one of the many clones of Azur Games' mobile hit "Stack Ball". The build file is named `StackBall2_GDistribution`, so it is the version made for GameDistribution; the 77pen.github.io copy is an unofficial re-upload whose ad SDKs point at m.igroutka.org. |
| Engine | Unity 2018.3.14f1 WebGL (WebAssembly), loaded by the old `UnityLoader.instantiate` with the `StackBall2_GDistribution.json` manifest. 256 MB heap. |
| License | **None.** No license or permission to redistribute; all rights reserved by its makers. The owner asked for it anyway (2026-10-21), like the other soccerrandomx games, so it can be taken down if the makers ask. Bundled libraries: jQuery 3.5.0 (MIT), animate.css 3.7.2 (MIT, Daniel Eden), Unity's own `UnityLoader.js`. |
| Thumbnail | `assets/thumbnails/stack-ball.webp`, a screenshot of the game's start screen, 640x360 |

## Security review
- `StackBall2_GDistribution.wasm.framework.unityweb` (plain JavaScript) is Unity's runtime plus the game's plug-ins. Two plug-ins added script tags for ad SDKs from `https://m.igroutka.org/ni2/sdk.js` (GameMonetize-style banner) and `https://m.igroutka.org/ni2/main.min.js` (GameDistribution-style interstitial and rewarded ads).
- Unity's built-in analytics tries to contact `config.uca.cloud.unity3d.com` and `cdp.cloud.unity3d.com`. The Content-Security-Policy blocks both (two harmless console errors).
- `OpenURL` is used by the game's privacy-policy button (opens a new tab if clicked).
- Unity caches the game files in IndexedDB (`UnityCache`) and keeps its save data in IndexedDB (`/idbfs`), like every Unity WebGL game.
- No `window.parent`/`window.top` access, cookies, or site-lock checks found.

## Changes made (all marked `ArcadeHub:`)
- `index.html`: the original page had lost the `<script>` tag that opened the `var Module = {}` block, so the code showed up as text; restored it (the block only held comments, now removed).
- `index.html`: Content-Security-Policy added so the page cannot contact other websites. It allows `eval` and `blob:` scripts because the Unity loader needs them.
- `index.html`: removed Cloudflare's dead "mirage2" script and its `data-cfsrc` image tags. The three loading-screen images (`assets/images/gamelogo.png`, `studiologo.png`, `site_info.png`) were missing on the original host too; the loading screen now shows the game's icon (`icon.png`, from `77pen.github.io/img/stack-ball.png`) and its blurred background uses it. The empty-link logo anchors and the "site info" badge were removed.
- `StackBall2_GDistribution.wasm.framework.unityweb`: the two `m.igroutka.org` addresses now load `arcadehub-no-ads.js` (new file) instead. It is also loaded by `index.html`. It shows no ads and fetches nothing: between-level ads finish at once, rewarded ads grant their reward, and the game is told to carry on.
- Nothing else was changed. The game data and WebAssembly files are untouched.

## Speed on high-refresh screens (checked 2026-10-21)
No 60-ticks-a-second cap is needed. Unity moves the game by elapsed time (`Time.deltaTime`). Measured with a simulated clock on 60, 120 and 144 Hz screens: the ball's idle bounce took 667 ms at all three, and holding to smash cleared about the same share of the level in the first second (progress bar 174, 169 and 154 pixels; a frame-based game would have been 2 to 2.4 times further at 120/144 Hz).

## Test notes
- Loads in about 2 seconds from a local server and reaches "Touch to play"; the site tests (player, fullscreen, back button, no outside requests) pass.
- The test browser reports "Unable to decode audio data" four times: the game's 4 sound clips are AAC, which the test browser (open-source Chromium) cannot play. Chrome and ChromeOS can, so this should not happen for players.

## Controls
Click or tap to start a level. Hold the mouse button (or finger) down to smash the ball through the rings; let go before a black ring or the ball breaks. Between levels, click or tap to continue.
