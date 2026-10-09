# Basket Random: integration notes  (PUBLISHED at the owner's request despite the issues below)

| Field | Value |
| --- | --- |
| Source | `basket-random-main.zip`, supplied by the site owner on 2026-10-09 ("Basket Random (Extra+ Mod)", from an unblocked-games repository). Its `@source.txt` shows it was downloaded from GameDistribution: https://html5.gamedistribution.com/rvvASMiM/bf1268dccb5d43e7970bb3edaa54afc8/ |
| Author | RHM Interactive (published on twoplayergames.org and distributed by GameDistribution). Made with Construct 3 |
| License | **None. Copyrighted game.** GameDistribution licenses it to websites only through its official embed, which shows its ads |
| Thumbnail | `assets/thumbnails/basket-random.webp`, an original drawing made for this site (not the game's art) |

## Known license issues (owner chose "Host ZIP copy" on 2026-10-09)
1. This is a ripped copy of a copyrighted game, hosted without permission. RHM Interactive or GameDistribution could send GitHub a takedown request.
2. Whoever made the ZIP patched GameDistribution's SDK (`js/main.min.js`): its site check (`game.api.gamedistribution.com/.../?domain=`) and its ad and tracking calls now read empty local files (`json/config.json`, `json/null.json`, `json/ping.json`, `js/null.js`). That is why it runs on any website with no ads. ArcadeHub did not make or change these patches.
3. The owner was offered GameDistribution's official embed (legal, with ads) and chose this copy instead.

## Security review
- Removed `js/analytics_ubg_v1_4.js` (loaded Google Analytics for the unblocked-games site) and its `<script>` tag in `index.html`.
- Removed `js/ubg235_client_v1_0.js` and `js/ubg235_client_v1_1.js` (not used by the page; they would load remote code from games235.com) and an ahrefs site-verification file.
- Added a Content-Security-Policy to `index.html` so the page cannot contact other websites (`connect-src 'self'`, `frame-src 'none'`). The Construct runtime and Box2D need inline script, `unsafe-eval`, WebAssembly and blob: workers, so those stay allowed.
- The remaining code is the Construct 3 runtime, Box2D, the Opus audio decoder, jQuery 3.6.0 and the patched GameDistribution SDK. No obfuscated code beyond normal minification.
- Saves (if any) go to the site's own storage, like the other games.

## Changes made
- `index.html`: removed the analytics script tag and added the Content-Security-Policy (both marked `ArcadeHub:`).
- Deleted the three remote-code/analytics scripts and the ahrefs file listed above.
- Nothing else was changed.

## Known quirks
- Two console errors on every load come from the patched SDK, not from this site: "Blocked: js/null.js" and an unhandled promise rejection "Cannot set properties of undefined (setting 'src')". The game plays normally.
- The menu's "MORE" button and the TWOPLAYERGAMES.ORG logo do nothing when clicked (checked in the player on 2026-10-09: no new tab, no navigation). The player's sandbox would block pop-ups anyway.

## Controls
W: player 1 (left team) jumps and shoots. Up arrow: player 2 (right team). "1P" plays the computer, "2P" a friend on the same keyboard. Touch screens: tap.
