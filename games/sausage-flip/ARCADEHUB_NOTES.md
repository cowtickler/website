# Sausage Flip: integration notes  (added at the owner's request; see the license issue below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/sausage-flip.html, only frames the game from https://77pen.github.io/p6/sausage-flip/. These files were downloaded from that address on 2026-10-20 (on the owner's PC, because the build machine cannot reach it). 112 game files, about 8 MB. |
| Author | Not named anywhere in the files. It is a PlayCanvas game made for Poki (it was built around Poki's SDK). |
| License | **None found. Copyrighted game.** No license, copyright notice or credit in any file. 77pen.github.io is an unofficial copy, and soccerrandomx.bitbucket.io an unofficial ad-supported mirror. The PlayCanvas engine (`playcanvas-stable.min.js`) and ammo.js physics are MIT/zlib licensed, but that does not cover the game itself. |
| Thumbnail | `assets/thumbnails/sausage-flip.webp`, a screenshot of the game (copyrighted art), 640x360 |

## Known license issue
This is an unofficial copy of a copyrighted game, hosted without permission, like Soccer Random and Basket Random. The developer or Poki could send GitHub a takedown request.

## Security review
- The download is a plain PlayCanvas export: `index.html`, the engine, `settings__.js`, `modules__.js`, `start__.js`, `loading__.js`, `game-scripts.js` (the game's own scripts, minified), `config.json` and the scene `1573175.json`, plus 102 assets under `files/assets/` (models, textures, level data, ammo.js physics as WebAssembly). No sounds.
- The original page loaded `/poki-sdk.js` from the root of 77pen.github.io, which in turn loads Poki's full SDK (ads from Google, Amazon and other ad networks, plus Poki tracking). That file was **not** copied. It is replaced by `poki-stub.js`, a small local stand-in where every call does nothing.
- `game-scripts.js` makes no network requests of its own, has no `eval`, and only touches `localStorage` for the game's save (level reached, skins). The only outside links are PlayCanvas/WebGL help links in error messages and an FPS-meter credit in a comment.
- Added a Content-Security-Policy to `index.html` so the page cannot contact other websites (same policy as Soccer Random).
- Checked in a browser on 2026-10-20: no requests to other websites, no missing files, no console errors.

## Changes made (all marked `ArcadeHub:` in `index.html`)
- Content-Security-Policy added.
- `<script src="/poki-sdk.js">` replaced with `poki-stub.js` (new file). Ad breaks finish at once, and "watch an ad" reward buttons give the reward straight away, since there are no ads to watch.
- Removed the link to `manifest.json` (missing on the original host too).
- **No 60-frames-a-second cap.** Unlike Soccer Random and Stack, this game is not tied to the screen's refresh rate: PlayCanvas moves everything by the real time passed, and the physics runs in fixed 1/120 s steps. Measured on 2026-10-20 with a simulated 60, 120 and 144 Hz screen: game time ran at exactly 1.000 seconds per real second on all three (the screen just updates more often), so the game is the same speed everywhere and a cap would only make it less smooth.
- Not downloaded because they 404 on the original host too: `files/assets/105904244/1/ammo.js` (an old fallback only used by browsers without WebAssembly) and `manifest.json`.
- Nothing else was changed.

## Controls
Drag back and let go (mouse or touch) to aim and flip the sausage. Keyboard: Left/Right arrows (or A/D) to aim, Space to flip. Land on the finish to clear the level.
