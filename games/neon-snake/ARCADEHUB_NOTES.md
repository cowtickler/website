# Neon Snake — integration notes

| Field | Value |
| --- | --- |
| Source | Original game written for this site (no third-party code or assets) |
| License | MIT (see `LICENSE.txt` in this folder) |
| Build step | None. Plain HTML, CSS and JavaScript |
| External requests | None |
| Storage | `localStorage` key `neon-snake:best` (best score). Works without it |
| Isolation | `standard` (needs same-origin storage to remember the best score) |
| Tested | Keyboard, touch d-pad, swipe, restart, game over, fullscreen in the player |

## Files

- `index.html` — page shell, HUD, overlay and touch d-pad
- `style.css` — self-contained styles
- `game.js` — game logic and canvas rendering
- `../../assets/thumbnails/neon-snake.webp` — thumbnail (original artwork)
