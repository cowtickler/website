# Cookie Clicker — integration notes  (PUBLISHED at the owner's request despite the issues below)

| Field | Value |
| --- | --- |
| Source | `cookieclicker-gh-pages.zip`, supplied by the site owner on 2026-10-08. It is ozh's unofficial mirror (https://github.com/ozh/cookieclicker, `gh-pages` branch) of the official game at https://orteil.dashnet.org/cookieclicker/ |
| Author | Orteil (Julien Thiennot) / DashNet. Version 2.058 |
| License | **None. Copyrighted commercial game** (also sold on Steam and Android). The page says: "Code and graphics copyright Orteil, 2013-2026. Feel free to alter this code to your liking, but please do not re-host it, do not profit from it and do not present it as your own." |
| How it opens | On its own page, not in the site player (`"openInPlayer": false` in the catalog) |

## Known license issues (owner chose "Host my copy" on 2026-10-08)
1. The author explicitly asks people not to re-host the game. Hosting it here goes against that, and the author or DashNet could send GitHub a takedown request for the repository.
2. All code, graphics and sounds are copyrighted. The Merriweather font in `cf-fonts/` is under the SIL Open Font License.
3. The copyright notices in `index.html`, `main.js` and the top bar are kept, and the top bar still links to the official game, Steam and the author.

## Why it is not in the player
`main.js` shows "Oops. Wrong address!" instead of the game when it runs inside a frame on another site (`if (top!=self && !Game.local) Game.ErrorFrame();`). The site's rules forbid bypassing embedding restrictions, so that check is untouched and the game opens as a normal page. The catalog option `"openInPlayer": false` (added for this game) makes its icon link straight to `games/cookie-clicker/index.html`, and `play.html?id=cookie-clicker` forwards there.

## Security review
- `index.html` loaded a cookie-consent banner script (cdnjs), the **Facebook Pixel** (connect.facebook.net and a facebook.com tracking image), **Google AdSense**, Playsaurus ad iframes, an AdventureQuest banner with tracking parameters, and a Cloudflare bot-check script. All of them were removed.
- `main.js` contacted orteil.dashnet.org for the "new version" notice, the Steam player count (heralds), Patreon grandma names and the "Other versions" menu. Those calls are switched off (see Changes).
- Uses `new Function()` once, to read the plural rules of the translations, and lots of inline `onclick` code, so the page's Content-Security-Policy allows inline scripts and `unsafe-eval`. Everything else is limited to this site (`connect-src 'self'`, `frame-src 'none'`), so the page cannot contact other websites.
- Saves go to `localStorage` under `CookieClickerGame` (shared with the rest of the site's origin, like the other games). Mods load only when the player runs `Game.LoadMod()` from the browser console.
- No obfuscated code beyond the minified `excanvas.compiled.js` (an old Internet Explorer canvas library, only loaded by IE 8 and older).

## Changes made
- `index.html`: removed the blocks listed above (each removal is marked with an `ArcadeHub:` comment), added the Content-Security-Policy, and added a "← Back to games" link at the start of the top bar.
- `main.js`: `DataDir` (the orteil.dashnet.org data address) is now empty, and `getJson()` returns early when it is empty. Both lines are marked `ArcadeHub:`.
- Not copied from the ZIP: `update.sh` (re-downloads the game from orteil.dashnet.org), `grab.txt`, `_jslist.txt`, `_fontlist.txt`, `showads.js` (ad-blocker check), and the `index.html` / `_*list.txt` directory listings inside `img/`, `snd/` and `loc/`.
- Nothing else was changed.

## Other notes
- The icon (`assets/thumbnails/cookie-clicker.webp`) is the game's own artwork (copyrighted), supplied by the owner on 2026-10-09 and fitted to 640x360.
- The "Other versions" menu links ("Live version", "Try the beta!") point at folders that only exist on the official site.
- The page is designed for a window at least 900 pixels wide.
- The page is 8 pixels wider than the window at every size (the body's default margin), so it can shift sideways by 8 pixels. The original page does the same, so it was left alone.
