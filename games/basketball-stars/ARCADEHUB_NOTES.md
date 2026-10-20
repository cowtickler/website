# Basketball Stars: integration notes  (added at the owner's request; see the license issue below)

| Field | Value |
| --- | --- |
| Source | The page the owner linked, https://soccerrandomx.bitbucket.io/go-games/basketball-stars.html, frames https://basketball-stars.io/1.embed, which frames the game itself from https://basketball-stars.io/game/basketball-stars/. These files were downloaded from that address on 2026-10-20 (on the owner's PC, because the build machine cannot reach it). 61 files, about 11 MB. |
| Author | MadPuffers (madpuffers.com). In-game: "MADPUFFERS 2019©", internal name "Basketball Legends 2019", version 1.0.8g. Made with Phaser CE 2.6.4 |
| License | **None. Copyrighted commercial game.** There is no license file. MadPuffers sells licenses for it ("Contact to license this game / madpuffers@gmail.com"); basketball-stars.io is an unofficial ad-supported copy |
| Thumbnail | `assets/thumbnails/basketball-stars.webp`, a screenshot of the title screen (copyrighted art), 640x360 |

## Known license issues
- This is an unofficial copy of a copyrighted commercial game, hosted without permission. MadPuffers could send GitHub a takedown request.
- The game uses cartoon likenesses of real basketball players, which the original build already has.
- The game has a site lock: a list of approved websites (y8.com, id.net, pog.com, gamepost.com, dollmania.com, madpuffers.com and a few others) and a "This version is url-locked / Contact to license this game" screen. On basketball-stars.io (not on the list) and on this site the game starts normally, so the lock does not trigger. It was not changed. If that screen ever appears, the game should be removed, not patched.

## Frame headers (checked 2026-10-20)
basketball-stars.io sends no X-Frame-Options or Content-Security-Policy, so it could also be framed. The owner asked for a copy stored in the repository, as for Soccer Random.

## Security review
- The download is the game's `index.html`, its main script `basketball_legends_2019.min.js` (Phaser CE with p2.js, DragonBones and the game code), six library scripts in `assets/box2dweb/` (nape, EaselJS, jQuery 3.1.1, Bluebird, DragonBones), CSS, five .woff fonts, atlases, data JSON and 24 .ogg sounds. The server has no .mp3/.m4a sounds, so iPhones and iPads get no sound, on the original site too.
- `index.html` loaded the Google IMA video-ad SDK (the game never uses it) and had a Cloudflare script added by the host. It also sets GameDistribution options, but the code that would load that SDK is commented out, and the game only calls it after checking that it exists.
- The main script loaded four small scripts from other websites: two Phaser plugins from jsdelivr (`@orange-games/phaser-cachebuster@2.0`, `@orange-games/phaser-super-storage@1.0`, both MIT) and two blur filters from rawgit (Phaser CE `filters/BlurX.js` and `BlurY.js`, MIT). They are now in `assets/vendor-ext/` with their licenses (copied from npm, versions 2.0.0 and 1.0.4, which is what jsdelivr serves for those ranges, and from Phaser CE's GitHub; the sizes match the files the original page loaded).
- The only outside links are buttons that open a new tab (More Games to basketball-stars.io, the MadPuffers logo, Facebook, Twitter, VK, the Y8 forum, app stores). Nothing is loaded from other websites.

## Changes made
- `index.html`: added the Content-Security-Policy (same policy as Soccer Random, without wasm), removed the Google IMA script and the Cloudflare script, and added the 60-frames-a-second cap from Basket Random (see below). All marked `ArcadeHub:`.
- `basketball_legends_2019.min.js`: the four outside script addresses now point to `assets/vendor-ext/`. Nothing else in it was changed.
- Added `assets/vendor-ext/` (the four scripts and three license files).
- Added `assets/images/rotate.png` (made for ArcadeHub): the game shows it on phones held upright, but the original host never had it, so that screen was blank.

## Speed on fast screens
Measured on 2026-10-20 during a match with a simulated 60, 120 and 144 Hz screen. The game runs a fixed 40 game steps a second on all three, with or without the cap, so unlike Basket Random and Soccer Random it never ran too fast. Without the cap it draws 60, 120 and 144 frames a second; with the cap, 60 on all three. The cap is kept because it halves the drawing work on fast screens and changes nothing on 60 Hz screens (like the Chromebook).

## Controls
One player: arrows or W A S D move and jump (double-tap left or right to dash), X or L shoots, Z or K does a super shot, Down or S blocks or steals. Two players on one keyboard: player 1 uses W A S D, B to shoot, V for the super shot; player 2 uses the arrows, L to shoot, K for the super shot. P pauses. Touch screens get on-screen buttons.
