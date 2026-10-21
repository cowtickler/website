# Jetpack Joyride: integration notes  (added at the owner's request; see the license issue below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/jetpack-joyride.html, only frames the game from https://77pen.github.io/p7/jetpack-joyride/. These files were downloaded from that address on 2026-10-21 (on the owner's PC, because the build machine cannot reach it). 402 files, about 16 MB. |
| Game | Jetpack Joyride, Halfbrick Studios' web version (the credits say "GAME AND SOFTWARE © 2011-2021 HALFBRICK STUDIOS"). Made with Phaser 3.24.1; `game3.js` is obfuscated |
| Author | Halfbrick Studios |
| License | **None. Copyrighted commercial game.** Neither site has a license or permission to copy it; soccerrandomx.bitbucket.io is an unofficial ad-supported mirror and 77pen.github.io is an unofficial copy |
| Thumbnail | `assets/thumbnails/jetpack-joyride.webp`, a screenshot of the game's title screen (Halfbrick's art), 640x360 |

## Known license issue
This is an unofficial copy of a copyrighted Halfbrick game (Jetpack Joyride and its art and name are Halfbrick's), hosted without permission, like the other soccerrandomx games. Halfbrick could send GitHub a takedown request.

## Security review
- Files: `index.html`, `css/styles.css` + `css/font/Jetpackia.ttf`, `engine/phaser-3.24.1.min.js` (the Phaser engine), `game3.js` (the game, obfuscated), `img/HB_ic_rotateScreen.png`, `splash.jpg`, and 395 files under `assets/` (images, sounds, atlases and level patterns, stored as encoded data that the game decodes itself).
- The game was built for GameDistribution: on load it sets `GD_OPTIONS` and adds a `<script id="gamedistribution-jssdk">` for GameDistribution's ad SDK. In this copy that script's address had been changed to `https://yell0wsuit.page` (whoever made the copy), so the game asked that website for a script on every load. It also has code for Google's H5 ad API (`adBreak`, `adsbygoogle`) and uses `localStorage` for saves and settings.
- No other outside addresses are used. With the changes below, nothing leaves the site: tested while loading, on the title screen and during a run (2026-10-21).

## Changes made
- `index.html`: added the Content-Security-Policy (same as the other copied games) and a `<script id="gamedistribution-jssdk" src="arcadehub-no-ads.js">` before `game3.js` (both marked `ArcadeHub:`). Because a script with that id already exists, the game does not add its own, so the yell0wsuit.page request is gone without changing `game3.js`.
- `arcadehub-no-ads.js` (new): a stand-in for the ad SDKs. `gdsdk.showAd('rewarded')` succeeds at once, so the "watch an ad" buttons (revive, shield, mech) give their reward with no ad; other `showAd()` calls tell the game the "ad" is over straight away; `adBreak` (Google's API) finishes at once too.
- `game3.js`, the engine and the assets are unchanged.

## Speed on high-refresh screens
No 60-frames-a-second cap is needed. The game moves by elapsed time, not per frame. Measured 2026-10-21 with a simulated 60, 120 and 144 Hz screen (virtual clock): the run distance grew 50 m per second on all three, and Barry's jetpack climb after 0.4 s and 0.6 s was within about 10% (the difference is when the press lands between frames, not a speed-up).

## Controls
- Hold the mouse button (or a finger on a touch screen) to fire the jetpack and fly up; let go to fall.
- Click or tap for the menus. There are no keyboard controls.
- Not play-tested here; the owner does play-testing.
