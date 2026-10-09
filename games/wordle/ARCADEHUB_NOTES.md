# Wordle (English) — integration notes

| Field | Value |
| --- | --- |
| Source | https://github.com/Hugo0/wordle (`wordle-main.zip` supplied by the site owner, 2026-10-09, SHA-256 `015d693b…8886`) |
| Author | Hugo Montenegro (code). Wordle itself is by Josh Wardle. |
| License | MIT for the code (`LICENSE`). **The word lists are not covered** by that license: the file says "individual copyright applies" to `webapp/data/languages`. |
| Build step | None to play. The page was generated once from the upstream templates and data (see Changes). Tailwind CSS was built with Tailwind 3.4.17 as a build tool only; it is not shipped. |
| External requests | None. The page makes requests only to this site. |
| Storage | `localStorage` (game results and today's board) |
| Isolation | `standard` (needs storage) |

## Flags for the owner

1. **The word lists.** `data/languages/en/en_5words.txt` starts "cigar, rebut, sissy, humph, awake", which appears to be the original Wordle answer list, the same list the daily word is taken from. The NYT owns Wordle, so this list is likely the NYT's. The upstream license does not cover it.
2. **The name.** "Wordle" is a trademark of The New York Times. The page keeps the original title and header ("Wordle EN").
3. **Supplement list.** `en_5words_supplement.txt` (10,638 words) is credited upstream to wooorm/dictionaries, which gathers several dictionaries under their own licenses. Those were not checked one by one.
4. **Share button.** Browsers allow copying only after a real click. Scripted tests could not confirm it, so the owner should try it.

## Review

- Read in full: `static/game.js`, `templates/game.html`, `app.py`, `style.css`.
- No `fetch`, XHR, WebSocket, `eval` or `document.write` in the game. The only dynamic code is Vue's template compiler, which is why the page's Content-Security-Policy allows `'unsafe-eval'` (that policy blocks every other outside request).
- Removed from upstream: Google Analytics (`G-273H1MLL3T`), the `cdn.tailwindcss.com` script, the `unpkg.com` Vue script, and the https redirect.

## How the page was made

The upstream app is a Flask server, which GitHub Pages cannot run. `build_wordle.py` (kept outside this folder) reproduces the English part of `app.py` and renders `templates/game.html` once:

- `words.js` holds the word list, the supplement, the characters, the config and the daily index, as `app.py` would put them in the page.
- The word list is QA-filtered the same way as `load_words()`: 5 letters, alphabetic, only the English character set. The list is in file order, not shuffled, because it is not sorted (`2309` words; supplement `10638`).
- The daily word is computed in the browser as `Math.floor(Date.now()/86400000) - 18992 + 195` (days since 1970-01-01 UTC, the same formula as `get_todays_idx()`), so the word changes at midnight UTC for everyone. The page's index matches the server formula (tested).
- Vue 3.0.2 (`vendor/vue/vue.global.prod.js`, MIT, `vendor/vue/LICENSE` from the upstream tag v3.0.2; npm tarball integrity `sha512-ciKF…2/9g==`).
- `tailwind.css` is built from the page's own HTML and JS with the default Tailwind config.
- Keyboard: QWERTY only. The Dvorak and Alphabetical layouts and their selector need the server to save the choice, so they are not included.
- `game.js` is upstream with the changes listed below. The MIT `LICENSE` and the upstream `README.md` are copied unchanged.

## Changes to upstream

- Removed the Google Analytics tracker, the CDN scripts and the https redirect (the redirect ran on GitHub Pages anyway and broke local testing).
- Replaced the server's template values with `words.js` and the daily-word formula above.
- Header title link (`<a href="/">`) no longer links, because inside the player it would open the GitHub Pages root. The Settings "Source Code" and "Feedback" links are plain text for the same reason: the player blocks pop-up tabs.
- Added a Content-Security-Policy meta tag that allows only this site.
- Fixed four bugs in upstream `game.js`:
  - **Win %** divided by `(games × 100)`, so it showed `NaN%` before the first game and a wrong small number after. It is now `wins ÷ games × 100`, rounded.
  - **Share** added a new click listener every time the stats modal updated (once a second while open), so one click shared several times. It is now `onclick`, set once per update.
  - **Caps Lock or Shift letters** were ignored because the key check was case-sensitive. Single-letter keys are now lowercased.
  - **Enter after an on-screen key** pressed the key again, because the button kept focus. The focus is now removed after the click.
- Added a new thumbnail (`assets/thumbnails/wordle.webp`), drawn for this site, not taken from upstream.

## Tests (setup only, no play-through)

Run on the local server (`arcade.test:8123`, Chromium, `scratchpad/wordle-test.mjs`): **31 of 31 pass**.

- Catalog: entry present, `standard` isolation, relative paths; thumbnail and license file load.
- Game page: no requests to any host other than the test server; no request failed; no console or page errors; Vue mounted; 28 keys; no layout selector; no Google Analytics, CDN or unpkg references; CSP meta present.
- Daily word: index equals the Python formula from `app.py` at test time; word is a 5-letter word from the list.
- Input: on-screen key types; uppercase typed letter is accepted; partial word and invalid word messages show; help modal opens and closes with Escape.
- Stats: one win and one loss show 50%.
- Player page (`play.html?id=wordle`): frame loads `games/wordle/index.html`; `standard` sandbox; fullscreen and back buttons visible; no title bar; the keyboard renders inside the frame; no horizontal scroll at 1366 px or 390 px.
- Homepage lists Wordle.

Not tested: the Share button (needs a real click), fullscreen on a real device, and a Chromebook.

## Files

- `index.html`, `game.js`, `words.js`, `style.css`, `tailwind.css`, `vendor/vue/` (Vue and its license), `LICENSE`, `README.md`, this file.
