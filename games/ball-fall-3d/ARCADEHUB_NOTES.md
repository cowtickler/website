# Ball Fall 3D (Y8): ArcadeHub notes  (FRAMED at the owner's request despite the issue below)

Checked 2026-10-09. No game files are stored here. The catalog entry frames
Y8's embed page in the player; the player adds the title, a "from Y8" link to
the game's Y8 page, and a Reload button.

| | |
| --- | --- |
| Game | Ball Fall 3D, developer Gamebiz (WebGL, added to Y8 on 2019-04-09) |
| Framed page | https://www.y8.com/embed/ball_fall_3d (Y8's game-only embed page) |
| Y8 game page | https://www.y8.com/games/ball_fall_3d (the "from Y8" link) |
| License | Copyrighted. Y8 (Web Entertainment Limited) offers this game to other websites as a link only |
| Thumbnail | `assets/thumbnails/ball-fall-3d.webp`, original artwork drawn for this site. Y8's own thumbnail (180x135, on cdn2.y8.com) was not copied: it is too small for the 640x360 tiles and is Y8's artwork |

## Known issue (owner chose "Frame it anyway" on 2026-10-09)

Y8 has an embed program: its "Games for your website" page
(https://www.y8.com/games_for_your_website) gives "iFrame Embed" code
(`https://y8.com/embed/<game>`) for games whose publishers allow it. Ball Fall
3D is not listed there, and its own "Add this game to your web page" box
offers only "Link to Page", not iFrame Embed. So Y8 has not offered this game
for embedding. The owner was told this and chose to frame the embed page
anyway. Y8 can stop it working at any time (for example by blocking frames or
checking the embedding site).

## Can it play inside this site? Probably, but not verified here.

- **Y8's embed page allows framing.** On 2026-10-09 it answered 200 with no
  `X-Frame-Options` and no `Content-Security-Policy` (securityheaders.com
  scan; the build machine cannot reach y8.com). Its content points at a Unity
  WebGL build on storage.y8.com, which is also allowed in play.html's
  `frame-src` in case the embed page moves the frame there.
- **Y8's ordinary game page refuses frames** (`X-Frame-Options: SAMEORIGIN`),
  so it is not used.
- **Not tested with the real game.** The player was tested with a stand-in
  page served at the real embed URL with its real headers: it loads in the
  frame, mouse and keys reach it without a click, Reload starts a fresh copy,
  fullscreen and Back work. Whether Y8's page shows ads, a sign-in or a
  "not available" message when framed on another site is unknown. Check the
  live site once.
- The frame keeps the player's sandbox: the game cannot open pop-ups (so a Y8
  sign-in window, if it asks for one, will not open) or send the visitor away
  from this site.
- **Not done:** downloading or re-hosting the WebGL build, or proxying.

## If it stops working

Switch the entry back to the link panel: set `"embeddable": false` and
`"entry": "https://www.y8.com/games/ball_fall_3d"` in `data/games.json`. The
player then shows a "Play on Y8" button that opens the game in a new tab.

## School networks

Securly and similar filters judge www.y8.com separately from this site. If it
is blocked, the frame shows the filter's block page (or nothing), and the
"from Y8" link is blocked too. Nothing here tries to get around that.

## Controls (from Y8)

Y8 lists "Down" and tags the game "Mouse Skill"; it says the game is made for
computers with a keyboard or mouse ("Your screen is too small to play this
game" on phones).
