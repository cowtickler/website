# Moto X3M Winter: integration notes  (added at the owner's request; see the license issue below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/moto-x3m-winter.html, only frames the game from https://77pen.github.io/p/moto-x3m-winter. These files were downloaded from that address on 2026-10-20 (on the owner's PC, because the build machine cannot reach it). 140 files, about 15 MB. |
| Author | MadPuffers (published on Poki). Made with Phaser 2 (CE), with the Nape physics engine, EaselJS, DragonBones, jQuery and Bluebird |
| License | **None. Copyrighted game.** Neither site has a license or permission to copy it; soccerrandomx.bitbucket.io is an unofficial ad-supported mirror and 77pen.github.io is an unofficial copy. The bundled libraries keep their own notices (Phaser MIT, jQuery MIT, Bluebird MIT, EaselJS MIT) |
| Thumbnail | `assets/thumbnails/moto-x3m-winter.webp`, made from the game's square icon on 77pen.github.io (copyrighted art), 640x360 |

## Known license issue
This is an unofficial copy of a copyrighted game, hosted without permission, like Basket Random and Soccer Random. MadPuffers or Poki could send GitHub a takedown request.

## What was downloaded
- `index.html`, `motox3m.min.js` (the game), `assets/lib/` (8 libraries), `assets/css/` (page style and 3 font styles), `assets/fonts/` (.woff and .ttf), `assets/atlases/x1/`, `assets/images/`, `assets/levels/` (25 levels and the bike and menu animations), `assets/sound/` (38 sounds as .ogg and .m4a; the .mp3 copies do not exist on 77pen.github.io and the game does not need them).
- The original page also loaded three files from the site root: `cloak.js` (empty), `poki-sdk.js` and `poki-sdk-core-v2.263.0.js` (Poki's ad and tracking SDK, which contacts poki.com, Google, Amazon and other ad networks). None of these were copied.

## Security review
- The game code contains the Poki SDK calls (ads, "watch an ad" rewards, analytics events) and links to madpuffers.com, Facebook, VK and Twitter that open only when clicked. It has a site lock that only allows Poki and MadPuffers addresses, but the 77pen.github.io copy already has it switched off (`checkDomain` returns true straight away); nothing else was changed in `motox3m.min.js`.
- No other network requests: the game only loads its own files.

## Changes made
- `index.html`: removed the empty `cloak.js`, the Poki SDK scripts and Poki's ad styles (one of which loaded an image from a.poki.com); added `poki-stub.js`, a Content-Security-Policy so the page cannot contact other websites (same policy as Basket Random), and the 60-frames-a-second cap from Basket Random (all marked `ArcadeHub:`).
- `poki-stub.js` (new): stands in for the Poki SDK. It shows no ads and contacts nothing; "watch an ad" rewards are given straight away.
- Speed: Phaser runs at most one game update per screen refresh and tries to keep to 60 a second, but on fast screens its timing drifts ahead. Measured on 2026-10-20 with a simulated 60, 120 and 144 Hz screen: without the cap the game ran 61, 91 and 85 updates a second (up to 1.5 times too fast); with it, 61, 60 and 61. The cap also stops the game redrawing the same picture twice on fast screens.

## Size and the Chromebook
About 15 MB, the largest part being the two music tracks (.ogg and .m4a, about 6.6 MB together; the browser loads only one format). The game draws with WebGL or canvas at a fixed size, which should be fine on a Dell 3110, but this has not been tested on one (`"lowEnd": "unknown"`).

## Controls
Up arrow or W: accelerate. Down arrow or S: brake and reverse. Left/Right arrows or A/D: lean (do flips). R: restart from the last checkpoint. P or Esc: pause. Space: start. Touch screens: on-screen buttons.
