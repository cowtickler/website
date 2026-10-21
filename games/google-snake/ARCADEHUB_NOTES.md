# Google Snake: integration notes  (added at the owner's request; see the license note below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/google-snake.html, only frames the game from https://77pen.github.io/p8/google-snake/. That address hosts just two files: `index.html` (a scraped copy of the Google Search page that runs the Snake doodle, titled "Google Snake - topVAZ") and Google's game script. Both were downloaded on 2026-10-21 on the owner's PC, because the build machine cannot reach that host. Everything else the game uses (sprites, sounds, menu icons, the Roboto font) loads from Google's servers, so with the owner's OK those files were downloaded from www.google.com, www.gstatic.com and Google Fonts too. 30 files, about 834 KB. |
| Author | Google (the Snake game from Google Search, 2019). |
| License | **None.** The code, art and sound are Google's copyrighted work and "Google" is Google's trademark. Nothing gives permission to re-host them. The owner chose on 2026-10-21 to host a full copy anyway (option 1 in the main chat). The Roboto font is under the SIL Open Font License / Apache 2.0 and is fine to host. |
| Thumbnail | `assets/thumbnails/google-snake.webp`, a screenshot of the game, 640x360 |

## Known license issue
This is an unofficial copy of Google's game, its art and its sounds, under Google's name. Google could ask for it to be taken down (for example with a DMCA notice to GitHub). If that happens, delete `games/google-snake/`, its thumbnail and its catalog entry.

## Security review
- `snake.js` is Google's minified Closure script for the Search page (about 550 KB). Besides the game it holds Search page modules that log to Google (`/gen_204`, `play.google.com/log`, `www.google.com/log`), an anti-abuse check that calls `/async/bgasy`, a translate API call and a Google-internal `corp.google.com` link. None of it is needed by the game.
- `index.html` held a Google API key copied from a Search results page and an `adservice.google.com` address.
- With the changes below, a test load and a game (Playwright, 2026-10-21) made no requests outside the game folder.

## Changes made (marked `ArcadeHub:` in `index.html`)
- Content-Security-Policy added, so the page cannot contact other websites. It allows `eval` and inline scripts because Google's page needs them.
- `google.log` replaced with a function that does nothing (stops the `/gen_204` pings).
- In the page's settings block: the anti-abuse fetch (`bgd` `as`) and the timing report (`jsa` `csi`) switched off; the API key and the `adservice.google.com` address removed (empty strings).
- The game script renamed from `gLQ5m9BRGyufS4bK7NpPnGaZ4uBd2n.js` to `snake.js`. In it, only these strings were changed:
  - `https://www.google.com/logos/fnbx/` and `//www.google.com/logos/fnbx/` → `logos/fnbx/` (sprites)
  - `"https://www.google.com"+a+b+".bin"` → `"."+a+b+".bin"` (sounds, now `./logos/fnbx/snake_arcade/*.bin`)
  - `//www.gstatic.com/images/icons/material/system/2x/` → `icons/` (mute buttons)
  - the two `.../log?format=json&hasfast=true` logging addresses, the translate API address and the `corp.google.com` link → `about:invalid`
- In `index.html`, the sprite and icon images, `keys.svg` and the font stylesheet point at the local copies.
- `fonts/roboto-500.css` is Google Fonts' stylesheet with its `fonts.gstatic.com` addresses changed to the local `.woff2` files.
- Nothing else was changed.

## Speed on high-refresh screens
No 60-ticks cap is needed. The game never calls `requestAnimationFrame` (0 calls measured on 2026-10-21); its loop runs on a 20 ms `setTimeout`, so 120 Hz and 144 Hz screens do not change its speed. A test with a simulated 60, 120 and 144 Hz screen moved the snake the same distance at all three.

## Controls
Arrow keys or WASD turn the snake; on a touch screen, swipe. Click or tap Play to start; the menu lets you pick the speed, board size, number of apples and the snake's look.
