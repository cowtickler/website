# Cookie Clicker: ArcadeHub notes

No game files are stored here (2026-10-09). The catalog entry
(`"embeddable": false`) makes the player show an "Open Official Game" button
that opens the official page in a new tab.

| | |
| --- | --- |
| Game | Cookie Clicker, by Orteil (Julien Thiennot) / DashNet |
| Official page | https://orteil.dashnet.org/cookieclicker/ |
| License | Copyrighted. The game says: "please do not re-host it, do not profit from it and do not present it as your own." |
| Thumbnail | `assets/thumbnails/cookie-clicker.webp`, an original drawing made for this site |

## History

- 2026-10-08: the owner supplied ozh's unofficial mirror (version 2.058) and
  chose to host it on its own page, with ads and trackers removed (PR #2).
- 2026-10-09: the owner asked for the official game inside the site player. It
  cannot run there, so on the owner's choice ("Replace copy") the hosted copy
  was removed and the icon now leads to the official game instead.

## Why it can't play inside this site

The game's own code shows "Oops. Wrong address!" instead of the game whenever
another website puts it in a frame: `if (top!=self && !Game.local)
Game.ErrorFrame();` in `main.js` (found in the copy downloaded from
orteil.dashnet.org; a test framing that copy on a non-localhost address showed
the message). The live official site could not be checked for
`X-Frame-Options` or `frame-ancestors` headers, because the build machine
cannot reach orteil.dashnet.org.

Not done, on purpose: patching out the check, proxying the official page, or
hosting the downloaded files (the author asks people not to re-host it).
Framing the official page would also run its ads and Facebook tracking inside
this site.

## On the official site

Progress is saved in the browser on orteil.dashnet.org, separately from this
site, so saves made in the old hosted copy do not carry over. Networks that
block orteil.dashnet.org (for example school filters) block the game too.
