# PokéPath TD: integration notes  (added at the owner's request, 2026-10-24)

| Field | Value |
| --- | --- |
| Source | Web version 1.3.6 served at https://oss.pokepath.tech/index.html (Last-Modified 23 Jan 2026). The owner linked https://poke-survivor.io/pokepath-td, an unrelated portal site with ads that only shows that page in an iframe. Downloaded on the owner's PC on 2026-10-24. |
| Game | PokéPath TD, a Pokémon fan tower defense game in plain HTML, CSS and JavaScript ES modules (no engine, no build step). Entry `src/js/bootstrap.js`; asset list `src/assets/assets.json`. |
| Author | Khydra (https://khydra98.itch.io/pokepath, https://x.com/khydra98). Map artist NOELLE. Full credits are in the game's menu (Credits). |
| Official builds | Khydra offers the game free (pay what you want) on itch.io as Windows, Linux and Mac downloads. |
| License | None found: no LICENSE or README, no license text in the files, and none on the itch.io page. That means all rights reserved. It is also a fan game built on Nintendo / Creatures / GAME FREAK / The Pokémon Company property (Pokémon sprites from the PMD Collab, music from Pokémon FireRed/LeafGreen). Hosted only because the owner asked for it; a takedown request is possible. |
| Thumbnail | `assets/thumbnails/pokepath-td.webp`, an original 640x360 drawing (path, towers, title), no game art |

## Security review
- `index.html` loads only `styles.css`, `src/css/*.css` and `src/js/bootstrap.js`.
- The only network call in the code is `fetch("./src/assets/assets.json")` (`src/js/game/Init.js`). Outside addresses appear only as credit links in `src/js/game/scenes/MenuScene.js` (x.com, YouTube, Twitch, itch.io, flaticon, khinsider, pokesprite, pmdcollab), opened only when clicked.
- No ads, analytics, trackers, `eval`, `window.top`/`parent` access, cookies, or frame check. The ads and Google Analytics on poke-survivor.io belong to that portal page and were not downloaded.
- Saves: `localStorage` key `data` (`src/js/file/data.js`).

## Speed
The game loop is a `setInterval` with a fixed step (`src/js/game/Game.js`), not `requestAnimationFrame`, so it runs at the same speed on 60, 120 and 144 Hz screens. No speed cap needed.

## Changes made
The game's own files are copied unchanged (1,109 files, about 32 MB). One file was added:
- `src/assets/images/maps/route1-effect.png`, a 1x1 transparent placeholder. Route 1 points at this overlay image but it returns 404 on oss.pokepath.tech too. Without it the game throws a `drawImage` error on every frame of Route 1, and because that happens between `ctx.save()` and `ctx.restore()` (`src/js/game/Game.js`), the canvas state is never restored. The transparent image draws nothing, which is what the original looks like.

## Known missing files (same on the original site)
- `src/assets/sounds/cries/*.wav` are referenced by `crySound()` in `src/js/file/audio.js`, which nothing calls; they don't exist on the original server either.
