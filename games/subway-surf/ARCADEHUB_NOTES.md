# Subway Surf — integration notes  (added at the owner's request despite the issues below)

| Field | Value |
| --- | --- |
| Source | `SubwaySurfers-master.zip`, supplied by the site owner on 2026-10-08. The ZIP does not say which GitHub repository it came from |
| Author | Vaibhav Garg (credited in `README.md`, which is kept unchanged) |
| What it is | A student WebGL project: "a replica of Subway Surfers", written from scratch in plain JavaScript |
| License | **None.** No license file, and the README gives no terms. Without a license the code is "all rights reserved" |
| Third-party code | `src/gl-matrix.js` is gl-matrix 2.4.0, MIT license, © 2015 Brandon Jones and Colin MacKenzie IV. Its notice is kept at the top of the file |
| External requests | The original page loaded Bootstrap 3.4.0 (CSS and JS) from maxcdn.bootstrapcdn.com and jQuery 3.3.1 from ajax.googleapis.com, only for layout. All three were removed. The game makes no other requests |

## Known license issues (owner asked for it to be added on 2026-10-08)
1. No license, so the site has no permission to redistribute the code.
2. "Subway Surfers" is a trademark of SYBO Games. The game page and catalog use the original page's own title, "Subway Surf", and the catalog notes say it is a fan-made replica, not the official game.
3. The textures in `static/` (sky, brick wall, ground, tracks, train, wood, hazard stripes and others) have no stated source and may be stock or web images that are not licensed for reuse.

## Security review
- Plain, readable JavaScript (about 3,500 lines plus gl-matrix). No `eval`, `new Function`, network calls, storage, cookies, `window.parent`/`window.top`, redirects or popups.
- Only `alert()` calls for WebGL and shader errors. The WebGL one now shows a message on the page instead.

## Changes made
- Moved into `games/subway-surf/` (the owner's GitHub upload had put the images at the repository root and the scripts in the site's `js/` folder; those copies were removed).
- `index.html` rewritten: no CDN files, no missing `../webgl.css`, no inline `onclick`, a Content-Security-Policy, and a start / game over screen. `style.css` and `arcadehub.js` are new.
- `src/game.js` (every change is marked with an `ArcadeHub:` comment):
  - Texture paths `../static/...` → `static/...`, so they work in a sub-folder on GitHub Pages.
  - The keyboard listener was added inside `tickElements()`, so a new copy was registered on every frame (thousands per minute). It is now registered once, and the arrows and Space no longer scroll the page.
  - Crashes and the end of the run called `sleep(100)`, which is not defined anywhere. The error froze the game with no message. They now call `gameOver()`, which shows the score and a Play again button.
  - The score is set with `textContent` instead of `innerHTML`.
  - The camera is placed before the first frame, so the scene shows behind the start screen.
- Nothing else in `src/` or `static/` was changed.

## Other notes
- Speed is tied to the frame rate: on a 120 Hz screen the run is twice as fast as on 60 Hz.
- The run ends after about 4,950 frames (about 80 seconds at 60 Hz).
- The canvas is sized once when the page opens (up to 1280x960), because the game never updates its WebGL viewport. Resizing or going fullscreen scales the picture.
- Keyboard only. There are no touch controls.
