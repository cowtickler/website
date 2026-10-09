# Papa's Freezeria: ArcadeHub notes

| | |
| --- | --- |
| Game | Papa's Freezeria, © 2011 Flipline Studios (sponsored by Armor Games). Version 2.0, updated 03/09/14 ("Major Bug fixes and removal of all Mochi Ads", per `gameinfo.txt`) |
| Source | Flipline's official **Standard Version**, `https://i.flipline.com/downloads/papasfreezeria.zip`, linked from https://www.flipline.com/games/papasfreezeria/license.html ("Download this version to put it on your site. No licensing necessary!"). The owner downloaded it and uploaded it on 2026-10-09, because the build machine cannot reach flipline.com. ZIP SHA-256 `358b1ac31626542139a1d97cbb90fac3b4fef5dc951a7c415f8465462f110620` |
| Files used | `papasfreezeria.swf`, **unmodified** (5,773,778 bytes, SHA-256 `d33f687a691fc8f6f07c62416ff22863a2b144fdeeb9d08c071d37b8029b8347`, Flash 12, ActionScript 3, 640x480 at 30 fps) and Flipline's `gameinfo.txt`, unmodified |
| Not copied | The ZIP itself, `Thumbs.db`, and the 100x100 and 300x300 promo images |
| Thumbnail | `assets/thumbnails/papas-freezeria.webp`: Flipline's `papasfreezeria_400x226.jpg` from the same ZIP (the image Flipline ships for hosting sites), trimmed by one pixel row to 16:9 and scaled to 640x360. Nothing else changed |
| Player | [Ruffle](https://ruffle.rs) 0.7.1, the site's shared copy in `vendor/ruffle/` (MIT OR Apache-2.0). No Y8 or other game site is involved |

## License (checked 2026-10-09)

- The game's license page offers the Standard Version for hosting: "We have two easy ways of getting Papa's Freezeria to host on your own site." The Branded (site-locked) version is no longer available.
- Flipline's Terms of Use (https://www.flipline.com/terms.html) allow content from "Free Games for your Site" to be used "to host on your own website", and say: "You may not alter or create derivative work of any content available on www.flipline.com", "You may not release or repackage any of our content as a mobile app", and "You may not redistribute or otherwise resell our content" through app stores, CD/DVD or torrents.
- So the SWF and `gameinfo.txt` are kept exactly as downloaded. The game's own Flipline and Armor Games logos, credits and copyright lines are untouched. The site only puts its own page around it.

## Security review

- The SWF contains no site lock (no "sitelock" code; it runs on any domain).
- It tries to load Armor Games' API (`http://agi.armorgames.com/assets/agi/AGI.swf`) and Flipline's promo server (`http://www.fliplineads.com/serve/data/papasfreezeria.xml`). The page's Content-Security-Policy (`connect-src 'self'`) blocks both, and Ruffle runs with `allowNetworking: 'none'`. The game then shows Flipline's built-in promo screen (its own "To Go!" app ad with a CONTINUE button), which is part of the unaltered SWF.
- Its links (MORE INFO, app store buttons, More Games, Get This Game for Your Site, the save help link) do nothing: Ruffle's `openUrlMode` is `deny` and the site's player blocks pop-ups and navigation. Tested: no new tab, no navigation, no requests.
- No requests to other websites were made in testing.

## What was tested (2026-10-09, Chromium, 1366x768, served under a non-localhost name like GitHub Pages)

- **Runs in Ruffle:** the promo screen, Armor Games and Flipline intros, title screen, save slots, character choice (Penny), typing a name, the intro story, Day 1's tutorial, taking an order, dragging the ticket, switching between all four stations, and the ice cream dispenser. Not played: a full day, the Mix and Top stations' actions, serving, the end-of-day results and later days. Those were left for the owner to try.
- **Saves:** starting a game creates a save immediately (slot 1 showed "Tester, Rank 1"). It was still there after the Reload button, after refreshing the page, and after closing and reopening the browser. Ruffle keeps Flash saves in the browser's localStorage under `<site host>//papasfreezeria_<slot>`, so they belong to that browser and that site address. Clearing site data, private windows, or another browser or computer start empty. The game's own "Save a backup" button (on the slot screen) was not tested.
- **Fullscreen:** the player's Fullscreen button puts the game area in fullscreen with the bar hidden, the game scaled to 1024x768 (4:3 kept, centered), and an Exit Fullscreen button. Clicks reached the game in fullscreen. A real Escape key press, sent while the game had focus, left fullscreen and restored the layout exactly. If the browser refuses fullscreen, the player falls back to filling the browser window (existing behavior).
- **Reload, Back, loading and errors:** Reload starts the game again in a fresh frame; Back returns to the icons. A missing SWF or a missing Ruffle shows a message instead of a blank screen.
- **First click notes:** Ruffle may need one click before the game gets clicks: "Click to unmute" when the browser blocked sound until the visitor interacts, or a one-time "enable hardware acceleration" notice on computers drawing without a graphics card (as the test machine did). Both are Ruffle's own and close with that click.

## Chromebook (Dell 3110) notes

- The SWF is 5.8 MB, plus Ruffle's 14 MB WebAssembly file, which the browser caches after the first Flash game.
- Not tested on a real Chromebook. The Flash game is drawn by Ruffle with the graphics card (WebGL); expect it to be heavier than the site's HTML games.
- The game needs a mouse or touchpad and the keyboard once, to type a name. Touch was not tested.

## School networks

Everything loads from this site, so a filter that allows the site allows the game. Nothing here tries to get around a filter.
