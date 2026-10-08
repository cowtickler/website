# Pac-Man — integration notes  (PUBLISHED at the owner's request despite the issues below)

| Field | Value |
| --- | --- |
| Source | https://github.com/luciopanepinto/pacman (ZIP supplied by the site owner, 2026-10-08) |
| Author | Lucio Panepinto |
| License | GPL-3.0 (`LICENSE`, copy in `LICENSE.txt`). jQuery and Buzz audio library: MIT |
| External requests | None |

## Known license issues (owner chose to publish anyway on 2026-10-08)
1. "Pac-Man", the character and the ghost names are trademarks of Bandai Namco; the GPL only covers the author's own code.
2. The sound files in `sound/` appear to be copied from the original arcade game, which the author could not license under the GPL.
3. `css/Quadrit.ttf` is "Copyright (c) Pixietype.com, 2003. All rights reserved", with no redistribution license.


## Other notes
- The code uses `eval` on its own fixed variable names only (no outside data). Not malicious, just old-style code.
- Works when enabled (tested). Not copied: unused `js/jquery-mobile.js`.
