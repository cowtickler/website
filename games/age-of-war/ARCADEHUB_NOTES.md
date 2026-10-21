# Age of War: integration notes  (added at the owner's request; see the license issue below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/age-of-war.html, only frames the game from https://77pen.github.io/p8/age-of-war/. These files were downloaded from that address on 2026-10-21 (on the owner's PC, because the build machine cannot reach it). About 8.4 MB after the changes below. |
| Author | Louissi / Max Games made the original Flash game. This is the HTML5 remake (Phaser CE 2.6.15, build "tc-55") published through GameDistribution with Azerion's "h5branding" loader |
| License | **None. Copyrighted game.** Neither site has a license or permission to copy it; soccerrandomx.bitbucket.io is an unofficial ad-supported mirror and 77pen.github.io is an unofficial copy |
| Thumbnail | `assets/thumbnails/age-of-war.webp`, a screenshot of the game's menu (copyrighted art), 640x360 |

## Known license issue
This is an unofficial copy of a copyrighted game, hosted without permission, like the other games from soccerrandomx.bitbucket.io. The rights holder could send GitHub a takedown request.

## Security review
- `index.html` loads `version.js`, then `age-of-war.min.js` (Phaser, p2 physics, Azerion's loader and the game). `js/phaser/` holds two Phaser plugins that were already local copies.
- `js/main.min.js` was the GameDistribution ad SDK (v1.15.7), which contacts gamedistribution.com, Google IMA/DoubleClick and other ad servers. **Replaced** with a small stand-in that loads nothing and shows no ads (see below).
- The game code also knows about Google Analytics/Tag Manager, GameAnalytics, cdn.fbrq.io (Azerion), Kongregate, Minijuegos, Newgrounds and web-font services. The game itself turns Google Analytics off; the GameAnalytics and "ad test" URLs were already pointed at the empty local files `json/null.json` and `js/null.js` in this copy. The rest are only used on particular portals.
- Clicking publisher logos/links may open another site in a new tab (`window.open`), like the "MORE" buttons in other games. Nothing is loaded into this page from other websites.
- Missing on the original host as well (404): `assets/audio/sound*.mp3` (only the .ogg sounds exist, so very old Safari/iPhone versions may have no sound).

## Changes made (all marked `ArcadeHub:`)
- `index.html`: added a Content-Security-Policy so the page cannot contact other websites, and `window.fbrqSA = true` so the loader reads its branding/site-lock lists from `assets/json/` instead of cdn.fbrq.io. With the outside server blocked, the loader otherwise froze on its spinner and never showed PLAY.
- `assets/json/domains.json`, `sitelock.json`, `internal.json`, `contracted.json`, `special.json`: new, each just `{}` (no site lock, no portal branding).
- `js/main.min.js`: the GameDistribution SDK replaced by a stand-in that only tells the game "SDK ready". The game's own check already left ads switched off, so nothing else changes; "watch an ad" rewards stay unavailable, as on the original copy.
- `assets/9467420d5c84482e9087276338a3a7b1-512x512.jpeg`: new, the game's icon (from 77pen.github.io/img/age-of-war.png) shown in the loading circle; it was fetched from img.gamedistribution.com before.
- `assets/images/branding_logo_agame.png` and `_small.png`: new 1x1 transparent images, so the loader shows no broken-image icon where Azerion's "Agame" logo would go.
- The game files themselves are unchanged.

## Speed on 120 Hz / 144 Hz screens
No 60-frames-a-second cap was needed. Phaser runs this game on a fixed 1/60 s timestep and never does more than one step per screen refresh, so faster screens do not speed it up. Measured on 2026-10-21 with a simulated 60, 120 and 144 Hz screen: 60, 59 and 60 game steps a second. (The flip side: if a slow computer drops below 60 frames a second, the game slows down instead of skipping.)

## Controls
Mouse or touch: buttons at the top train units, build/sell turrets, evolve to the next age and fire the special attack.
