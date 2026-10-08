# Fireboy & Watergirl: Forest Temple — integration notes

| Field | Value |
| --- | --- |
| Game | Fireboy & Watergirl in the Forest Temple, © Oslo Albet 2009, published by Armor Games |
| Source | `fireboy-and-watergirl-source-main.zip`, supplied by the site owner on 2026-10-08. Its README calls it "an unofficial repository" of files extracted from the four games, plus their EXEs |
| License | **None.** The game is a copyrighted commercial game, and the repository has no permission to redistribute it |
| File used | Only `Forest Temple/FireBoyAndWaterGirl - ForestTemple.swf`, renamed to `forest-temple.swf` (1,856,060 bytes, SHA-256 `1ca999b13fcd1ebf5d5ec94c60541c4b7239b3ba2c913f86bb04fa500c41d129`). It is an ActionScript 3 SWF (version 9), 640x480 at 25 fps |
| Not copied | The ZIP, the EXEs, the Flash Player, and the extracted scripts, sprites and sounds |
| Player | [Ruffle](https://ruffle.rs) (MIT OR Apache-2.0), loaded from `https://unpkg.com/@ruffle-rs/ruffle`. That URL always serves the newest release; it was 0.7.1 when tested |

## Known issues before publishing
1. The game is copyrighted and has no license, so publishing it on a public site is not covered by any permission.
2. The title screen loads an ad from `server.cpmstar.com`. The page's Content-Security-Policy blocks it, so a grey box is shown where the ad would be.
3. "More Games" and "Submit Hiscore" link to Armor Games. They do nothing here, because Ruffle's `openUrlMode` is `deny` and the site's player blocks pop-ups.
4. Ruffle comes from unpkg.com, so the game needs an internet connection. If a school or work network blocks unpkg.com, the page shows a message instead of the game.

## Files in this folder
- `index.html`: the page, with a "Back to games" link (hidden inside the ArcadeHub player, which has its own back button)
- `game.js`: starts Ruffle and shows a message if Ruffle or the SWF cannot be loaded
- `style.css`: layout and colors matching the site
- `forest-temple.swf`: the game

## Testing notes (2026-10-08)
- No site lock was found: the game runs on localhost and should run on GitHub Pages.
- Fireboy uses the arrow keys and Watergirl uses W, A and D. The keyboard works once the game has been clicked, and the menus need clicks anyway.
- In the headless test browser, the first click on the title-screen PLAY button was sometimes ignored, and a second click worked.
- Ruffle keeps level progress in the browser's local storage.
