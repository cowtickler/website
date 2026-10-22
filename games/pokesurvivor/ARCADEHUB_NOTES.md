# PokéSurvivor: integration notes  (added at the owner's request, 2026-10-22)

| Field | Value |
| --- | --- |
| Source | https://github.com/JPTER78/pokesurvivor, commit ce57853 (2026-10-21), the public source of https://pokesurvivor.com |
| Game | PokéSurvivor · Mundo Misterioso, a Survivor.io-style Pokémon fan game in plain JavaScript on Canvas 2D (no engine, no build step needed; `js/app.min.js` is the author's built bundle) |
| Author | JPTER78 (Jonathan Piera Torregrosa) |
| License | Code: PolyForm Noncommercial 1.0.0 (`LICENSE`, `LICENSE-NONCOMMERCIAL.md`). Sprites: SpriteCollab, CC BY-NC 4.0 (artists in `CREDITS.md`). Font: Pixelify Sans (OFL). Pokémon is a trademark of Nintendo / Creatures / GAME FREAK; this is an unofficial, non-profit fan game |
| Thumbnail | `assets/thumbnails/pokesurvivor.webp`, cropped from the game's own `assets/og-image.jpg`, 640x360 |

Required Notice: Copyright 2026 JPTER78 (https://github.com/JPTER78/pokesurvivor)

## License conditions
PolyForm Noncommercial and CC BY-NC allow copying and sharing only for non-commercial use: no ads, no charging to play or for anything in it. This site has no ads and is free, so the copy is allowed as long as that stays true and the license, credits and notice above stay with it. The author says https://pokesurvivor.com is the only official site and has asked Google to remove another rehost (pokesurvivor.co, which had ads), so a takedown request is possible.

## Why it is a copy and not framed
pokesurvivor.com sends no frame-blocking headers, but `js/noframe.js` refuses to start the game inside a frame from another website and shows "This is not the official website" instead. It accepts a frame from the same website, so this copy runs inside the ArcadeHub player. `noframe.js` is unchanged.

## What works
- Guest single-player. `js/core/db.js` only connects to the author's Firebase project on pokesurvivor.com, jpter78.github.io and localhost; anywhere else (like this site) the game runs in its local mode, keeps progress in this browser, and never loads Firebase. So accounts, cloud saves, rankings, friends and co-op are not available here; use pokesurvivor.com for those.
- The game's own service worker (`sw.js`) caches sprites as they are used, inside `games/pokesurvivor/` only.
- `updater.js` checks this copy's own `version.json`, so it never reloads into another site's version.

## Security review
- Scripts: `js/core/locales.js`, `js/noframe.js`, `js/boot.js`, `js/app.min.js` (plus `js/lang/<language>.js` for French, Italian, Portuguese and Chinese). The rest of `js/` is the author's readable source, kept for reference.
- Outside addresses in the code: www.gstatic.com (Firebase SDK), apis.google.com (Google sign-in), Firebase / Firestore, the co-op ICE server ice.pokesurvivor.com. None of them is used on this site because the cloud is off (checked in a test with every outside request logged, 2026-10-22). Links to ko-fi.com, GitHub and PokeAPI only open when clicked.
- No ads, analytics or trackers.

## Changes made
None. Files copied as they are: `index.html`, `css/`, `js/`, `assets/`, `manifest.webmanifest`, `favicon.ico`, `sw.js`, `version.json`, `LICENSE`, `LICENSE-NONCOMMERCIAL.md`, `CREDITS.md`, `README.md`. Left out: the guide, Pokédex and other info pages (`guia/`, `pokedex/`, `en/`...), `docs/`, `tests/`, `tools/`, `infra/` and the Firebase rules, so the "Guide" and "Pokédex" links in the game's menu lead to missing pages here.

## Size
About 79 MB, 13,500 files, nearly all of it sprite sheets for 966 Pokémon. Only the sprites for the Pokémon on screen are downloaded.

## Updating
Copy the same files again from a newer commit of the GitHub repository and update the commit above.
