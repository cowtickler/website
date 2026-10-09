# ArcadeHub

A fast, static HTML5 gaming website. Games run inside the site in an embedded
player, the library is driven by one JSON catalog, and everything works on free
GitHub Pages hosting with no backend and no build step.

"ArcadeHub" is a placeholder name. See [Rename and restyle](#rename-and-restyle).

## What is included

| Feature | Where |
| --- | --- |
| Homepage: a grid of game icons, nothing else | `index.html`, `js/app.js` |
| Player: the game fills the window, with a back button and fullscreen | `play.html?id=<game-id>`, `js/player.js` |
| Central game catalog (validated on load; unsafe entries are skipped) | `data/games.json`, `js/games.js` |
| Games: 2048, Chess, Minesweeper, Pac-Man, Neon Snake, Fireboy & Watergirl (Forest Temple and Light Temple), Cookie Clicker | `games/` |
| Source and license notes for each game | `games/<game-id>/ARCADEHUB_NOTES.md` |
| Catalog checker (optional, needs Node.js) | `tools/validate-catalog.mjs` |
| Guide for adding open-source games | [`ADDING_GAMES.md`](ADDING_GAMES.md) |

Minesweeper and Pac-Man are live at the owner's request even though they have
known license problems (no license for Minesweeper; Namco trademarks, arcade
sounds and unlicensed fonts in Pac-Man). The details are in their
`ARCADEHUB_NOTES.md` files. Consider these before making the site public.

Fireboy & Watergirl: Forest Temple is the original Flash game (`forest-temple.swf`)
played with [Ruffle](https://ruffle.rs), which the page loads from unpkg.com, so
it needs an internet connection. It is a copyrighted commercial game with no
license; see `games/fireboy-watergirl/ARCADEHUB_NOTES.md`.

Cookie Clicker is Orteil's copyrighted game, from an unofficial mirror. Its
author asks people not to re-host it, so it could be taken down. It opens on
its own page instead of the player, because it refuses to run inside a frame
(`"openInPlayer": false` in the catalog). Its ads and Facebook tracking were
removed; see `games/cookie-clicker/ARCADEHUB_NOTES.md`.

## Project structure

```
gaming-website/
├── index.html              Homepage: the game icons
├── play.html               Game player (play.html?id=2048)
├── css/style.css           All styles; colors at the top
├── js/
│   ├── config.js           Site name and settings
│   ├── ui.js               Small shared helpers
│   ├── games.js            Catalog loading, validation, game tiles
│   ├── app.js              Homepage logic
│   └── player.js           Player logic
├── data/games.json         THE game catalog
├── games/                  One folder per game (its own files + license)
│   ├── 2048/
│   ├── chess/
│   ├── minesweeper/
│   ├── pacman/
│   ├── neon-snake/
│   └── fireboy-watergirl/  Flash game played with Ruffle
├── assets/
│   ├── thumbnails/         640x360 WebP icons, named <game-id>.webp
│   └── icons/              Favicon
├── _incoming/              Downloads waiting for review (never published)
├── tools/validate-catalog.mjs
├── start-server.bat        Double-click to preview on Windows
├── CLAUDE.md               Rules for Claude Code sessions in this folder
├── ADDING_GAMES.md
├── .gitignore              Keeps _incoming/ out of GitHub
├── .nojekyll               Tells GitHub Pages to serve files as-is
└── README.md
```

All URLs are relative (`css/style.css`, `games/2048/index.html`), so the
site works both at `http://localhost:8000/` and at
`https://username.github.io/gaming-website/`.

---

## 1. Open the project in Claude Code

1. Open **Windows Terminal** or **PowerShell**.
2. Go to the project folder, for example:
   ```powershell
   cd "$HOME\Documents\gaming-website"
   ```
3. Start Claude Code:
   ```powershell
   claude
   ```
Claude Code reads `CLAUDE.md` automatically, which tells it how this project is
organized and how to add games safely. To add a game, say something like:
*"Add this game to the site: https://github.com/owner/repo"* (see
[ADDING_GAMES.md](ADDING_GAMES.md)).

## 2. Preview the site locally

Browsers block the game catalog when you double-click `index.html` (the page
will tell you so). Run a small local web server instead. Pick one:

**Option A: double-click `start-server.bat`.** It uses Python or Node.js if
either is installed, then opens http://localhost:8000/.

**Option B: Python** (install from https://www.python.org/downloads/ and tick
"Add python.exe to PATH"):
```powershell
cd "$HOME\Documents\gaming-website"
python -m http.server 8000
```
Open http://localhost:8000/ . Press `Ctrl+C` in the terminal to stop.

**Option C: Node.js** (https://nodejs.org/):
```powershell
npx http-server -p 8000 -c-1
```

**Option D: VS Code**: install the "Live Server" extension, open the folder,
right-click `index.html` → *Open with Live Server*.

To test exactly how GitHub Pages will serve the site under a sub-folder, put
the project inside another folder and serve that parent folder, then open
`http://localhost:8000/gaming-website/`.

Optional check before publishing (needs Node.js):
```powershell
node tools/validate-catalog.mjs
```

## 3. Create a GitHub repository

1. Sign in at https://github.com (create a free account if needed).
2. Install **GitHub Desktop** from https://desktop.github.com and sign in with
   the same account (*File → Options → Accounts*).

You can create the repository from GitHub Desktop in the next step, so there is
nothing else to do on the website.

## 4. Upload the website with GitHub Desktop

1. In GitHub Desktop choose **File → Add local repository…** and select the
   `gaming-website` folder.
2. It will say the folder is not a Git repository. Click **create a
   repository** in that message, keep the name `gaming-website`, leave
   *Git ignore* as **None** (the project already has a `.gitignore`), and
   click **Create repository**.
3. Click **Publish repository** (top bar).
   - **Name:** `gaming-website` (this becomes part of the web address).
   - **Keep this code private:** GitHub Pages on a free account only works for
     **public** repositories. Untick it when you are ready for the site to be
     public. If you want to stay private for now, leave it ticked; you can
     change visibility later on GitHub under *Settings → General → Danger
     Zone → Change visibility*.
4. Click **Publish repository**.

## 5. Turn on GitHub Pages

1. In GitHub Desktop choose **Repository → View on GitHub**.
2. On GitHub open **Settings → Pages** (left sidebar).
3. Under **Build and deployment → Source** choose **Deploy from a branch**.
4. Under **Branch** choose **main** and **/ (root)**, then **Save**.
5. Wait one or two minutes and refresh the page. GitHub shows
   *"Your site is live at https://username.github.io/gaming-website/"*.

The `.nojekyll` file makes GitHub serve the files exactly as they are.

## 6. Publish future updates

1. Change files (yourself or with Claude Code) and preview locally.
2. Open GitHub Desktop. Your changes are listed on the left.
3. Write a short summary (for example *"Add Space Blaster game"*) and click
   **Commit to main**.
4. Click **Push origin**.
5. GitHub Pages updates the live site within a minute or two. If you still see
   the old version, refresh with `Ctrl+Shift+R`.

## 7. Add new HTML5 games

The short version (details in [ADDING_GAMES.md](ADDING_GAMES.md)):

1. Check the game's license allows redistribution.
2. Put its playable files in `games/<game-id>/` (keep its LICENSE and notices).
3. Add a 640x360 thumbnail at `assets/thumbnails/<game-id>.webp`.
4. Add an entry to `data/games.json`.
5. Preview, play it in `play.html?id=<game-id>`, run the validator, commit, push.

With Claude Code you can simply give it the repository URL or the extracted
folder and ask it to integrate the game; `CLAUDE.md` tells it the full process,
including license and security review.

---

## Rename and restyle

- **Name:** `siteName` in `js/config.js`, plus the `<title>` tags in
  `index.html` and `play.html`.
- **Colors:** the `:root` block at the top of `css/style.css`.
- **Icon size:** `--tile-min` in `css/style.css` (smallest icon width; the grid
  fits as many columns as the screen allows).
- **Order of games:** the order of entries in `data/games.json`.

## Performance notes (low-end Chromebooks)

- No frameworks, no web fonts, no trackers. The site's own code is about
  10 KB gzipped plus the icons.
- The homepage never loads game files; a game loads only on its player page,
  in a single iframe.
- Icons are lazy-loaded WebP files (keep them at 640x360, under ~40 KB).

## Security model

- Every page has a Content-Security-Policy that only allows scripts, styles,
  images and frames from the site itself.
- Catalog text is always inserted as text, never as HTML. Entries with unsafe
  paths (`javascript:`, `../`, absolute URLs not on the allow-list) are ignored.
- Games run in a sandboxed iframe without `allow-top-navigation` or
  `allow-popups`, so a game cannot redirect the player away or open pop-ups.
- **Important:** in the default `standard` isolation, games run on the same
  origin as the site (needed for saving progress), so a malicious game could
  still read site storage. That is why every third-party game must be reviewed
  before it is added (see ADDING_GAMES.md). Games that do not need storage can
  use `"isolation": "strict"` for a fully separate origin.

## Browser support

Current Chrome / ChromeOS, Edge, Firefox, Safari on macOS, iPadOS and iOS, and
Android browsers (letterboxing of fixed-size games uses CSS container units: Chrome 105+,
Safari 16+). iPhone Safari does not support real fullscreen for web
pages, so the player uses a full-window mode with an exit button there.
