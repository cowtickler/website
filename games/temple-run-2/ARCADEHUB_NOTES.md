# Temple Run 2 (ENGINEERING.com): ArcadeHub notes

Checked 2026-10-09. No game files are stored here. The catalog entry frames
ENGINEERING.com's own page in the player; the player adds the title, a
"from ENGINEERING.com" link to the original page, and a Reload button.

| | |
| --- | --- |
| Game | Temple Run 2, by Imangi Studios |
| Framed page | https://games.engineering.com/temple-run-2/index.html (the URL the owner supplied) |
| Host | ENGINEERING.com's "Games & Puzzles" section (Arrowfly LLC) |
| License | Not stated. ENGINEERING.com's terms (https://www.arrowfly.com/terms/) say its content belongs to "the Company and its licensors" and say nothing about framing. Whether Imangi licensed this copy to ENGINEERING.com is unknown |
| Thumbnail | `assets/thumbnails/temple-run-2.webp`, original artwork drawn for this site (not Imangi's) |

## Can it play inside this site? Probably, but not verified here.

- **The page allows framing.** On 2026-10-09 it answered 200 with no
  `X-Frame-Options` and no `Content-Security-Policy` (scanned with
  securityheaders.com, because the build machine cannot reach
  games.engineering.com). Browsers therefore allow other sites to frame it.
- **Not tested with the real game.** The build machine's network blocks
  games.engineering.com, so the game itself (its scripts, any site lock, ads,
  sound, controls) was never loaded here. The player was tested with a
  stand-in page served at the real URL with the real headers: it loads in the
  frame, arrow keys and swipes reach it without a click, Reload starts a fresh
  copy, fullscreen and Back work. Check the live site once to confirm the real
  game starts.
- The frame keeps the player's sandbox: the game cannot open pop-ups or send
  the visitor away from this site. Its storage stays on games.engineering.com.
- **Not done, on purpose:** downloading or re-hosting the game's files, or
  proxying the page. Only ENGINEERING.com's own page is framed.

## If it stops working

- Slow or unreachable: after 15 seconds the player says the game is taking a
  long time and offers Try again, Open Original Game and Back to games.
- If ENGINEERING.com starts refusing frames (`X-Frame-Options` or CSP
  `frame-ancestors`), the frame shows the browser's "refused to connect" page;
  the title bar's ENGINEERING.com link still opens the game. Then switch the
  entry to `"embeddable": false` so the player shows a link panel instead.
- The player cannot see inside a page from another website, so a frame that
  "loaded" may still show an error or a block page. That is why the source link
  and Reload stay in the bar.

## School networks

Securly and similar filters judge games.engineering.com separately from this
site. If it is blocked, the frame shows the filter's block page (or nothing),
and Open Original Game is blocked too. Nothing here tries to get around that.

## Controls (original game)

Left/right arrows turn at corners, up jumps, down slides. Touch screens:
swipe. Not verified on ENGINEERING.com's copy.
