# Block Blast: integration notes  (PUBLISHED at the owner's request despite the license issue below)

| Field | Value |
| --- | --- |
| Source | https://blockblast.game/game, the game page that BlockBlast.game frames on its homepage. Downloaded 2026-10-11 |
| Author | Unity WebGL build "Block Blast Puzzle" 1.1, company name "reun" in its Unity config, published on BlockBlast.game. Not Hungry Studio's Block Blast! app |
| License | **None. "BlockBlast.game © 2026 All rights reserved"** (its About page). No embed or redistribution terms found |
| Thumbnail | `assets/thumbnails/block-blast.webp`, an original 640x360 drawing made for this site (the owner chose it, 2026-10-11) |

## Known license issue (owner chose to host the files, 2026-10-11)
1. This is a copy of a game whose site reserves all rights, hosted without permission. BlockBlast.game (or whoever owns the build) could send GitHub a takedown request, which can affect the whole repository.
2. The owner was told this and first had the game framed from BlockBlast.game (commit 3aa381a), then asked for the files to be hosted here instead.

## Files
Copied unchanged from blockblast.game (checked byte for byte after copying):

- `Build/BlockBlast1.1-8.loader.js` (Unity loader)
- `Build/BlockBlast1.1-8.framework.js.unityweb`, `.wasm.unityweb`, `.data.unityweb` (gzip with Unity's "UnityWeb Compressed Content" header; the loader unpacks them itself, so GitHub Pages needs no special headers)
- `style.css` (was `block_blast_style.css`), `unity-logo-dark.png`, `progress-bar-empty-dark.png`, `progress-bar-full-dark.png`

Total about 10 MB. No `StreamingAssets` files are referenced by the build, so none were copied.

## Security review
- `index.html` was rebuilt from BlockBlast.game's game page (Unity's default WebGL template). Removed: Google Analytics (`G-XVTY7LSPS3`), Google AdSense (`ca-pub-1851068468056357`), the service worker registration (`/ServiceWorker.js`, an empty file there) and the icon, manifest, canonical and social-preview tags that pointed at BlockBlast.game.
- Added a Content-Security-Policy so the page only loads this site's own files (`connect-src 'self' data: blob:`, `frame-src 'none'`). Unity needs inline script, `blob:` scripts and `'wasm-unsafe-eval'`.
- Unpacked and read through `framework.js`: standard Unity/Emscripten runtime with no custom JavaScript plugins (no ad, analytics or network SDKs). `window.open` appears only in Unity's `Application.OpenURL` (`_JS_Eval_OpenURL`), which the player's sandbox blocks (no `allow-popups`). `WebSocket` and `postMessage` are Emscripten's own socket and main-loop code.
- The only URLs in the loader, framework, game data and WebAssembly are library and schema references (W3C XML, Microsoft, NuGet, Unity docs, font licenses). No ad networks or trackers.
- Tested in the player on a local server: every request stays on this site.

## Known quirks
- The console shows one error on load from DOTween (an animation library inside the game): "DOTWEEN ► Couldn't load Modules system". The game plays normally.
- Unity stores the best score and progress in the browser (IndexedDB) for this site.

## Controls
Drag a piece onto the 8x8 board with the mouse or a finger. Fill a row or column to clear it.
