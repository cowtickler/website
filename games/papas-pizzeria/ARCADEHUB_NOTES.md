# Papa's Pizzeria: ArcadeHub notes

| | |
| --- | --- |
| Game | Papa's Pizzeria, © Flipline Studios. Version 2.0, updated 03/10/14 ("Major Bug fixes and removal of all Mochi Ads", per `gameinfo.txt`) |
| Source | Flipline's official **Standard Version**, `https://i.flipline.com/downloads/papaspizzeria.zip`, linked from https://www.flipline.com/games/papaspizzeria/license.html ("Download this version to put it on your site. No licensing necessary!"). The owner downloaded it and uploaded it on 2026-10-09. ZIP SHA-256 `f2142499e31ae254cd7faab6684741fb9dc70edae6c4e7197c8cc2f6396693f2` |
| Files used | `papaspizzeria_v2.swf`, **unmodified** and under its original name (2,842,151 bytes, SHA-256 `86ebb12d28020e534ebd5c9a04788f971cff08a4c73b900c40abff137a40d2c4`, Flash 9, 600x450 at 30 fps) and Flipline's `gameinfo.txt`, unmodified |
| Not copied | The ZIP itself, `Thumbs.db` and the 100x100 promo image |
| Thumbnail | `assets/thumbnails/papas-pizzeria.webp`: Flipline's `papaspizzeria_400x226.jpg` from the same ZIP (the image Flipline ships for hosting sites), trimmed by one pixel row to 16:9 and scaled to 640x360. Nothing else changed |
| Player | [Ruffle](https://ruffle.rs) 0.7.1, the site's shared copy in `vendor/ruffle/` (MIT OR Apache-2.0) |

## License (checked 2026-10-09)

Same terms as Papa's Freezeria (see `games/papas-freezeria/ARCADEHUB_NOTES.md`):

- The game's license page offers the Standard Version for hosting. The Branded (site-locked) version is no longer available.
- Flipline's Terms of Use (https://www.flipline.com/terms.html) allow it to be used "to host on your own website", and say "You may not alter or create derivative work of any content available on www.flipline.com".

So the SWF and `gameinfo.txt` are kept exactly as downloaded, and the game's own logos, credits and copyright lines are untouched.

## Security review

- No site lock was found (no "sitelock" code).
- The SWF still contains a Mochi ad server address (`http://x.mochiads.com/srv/1/`) and Flipline's promo server (`http://www.fliplineads.com/serve/pdata/`). The page's Content-Security-Policy (`connect-src 'self'`) blocks both, and Ruffle runs with `allowNetworking: 'none'`.
- Its links (flipline.com, papalouie.com, app stores, Papa's Pastaria) do nothing: Ruffle's `openUrlMode` is `deny` and the site's player blocks pop-ups and navigation.
- It saves with a Flash SharedObject, which Ruffle keeps in the browser's localStorage.

## What was tested (2026-10-09)

At the owner's request, only the setup was tested, not the gameplay (the owner is play-testing it). Tested in Chromium at 1366x768, served under a non-localhost name like GitHub Pages:

- Ruffle loads the SWF and draws the game in the player at 4:3.
- The bar shows the title, the "by Flipline Studios" link and the Reload button.
- Reload, fullscreen, Back and the error messages (Ruffle missing, SWF missing) work.
- No requests go to other websites.

Not tested: gameplay, saves, sound, touch, and a real Chromebook.

## School networks

Everything loads from this site, so a filter that allows the site allows the game. Nothing here tries to get around a filter.
