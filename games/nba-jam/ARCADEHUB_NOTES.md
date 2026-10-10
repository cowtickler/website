# NBA Jam (EmulatorJS): ArcadeHub notes

Checked 2026-10-10. This integration was requested by the site owner from the
public page at https://sites.google.com/view/emulatorjs/games/nba-jam.

| | |
| --- | --- |
| Game | NBA Jam (Super Nintendo) |
| Supplied page | https://sites.google.com/view/emulatorjs/games/nba-jam |
| Emulator | EmulatorJS 4.2.3, self-hosted from the official built release |
| Core | `snes` (Snes9x) |
| Game file | `https://allancoding-files.netlify.app/snes-nes/NBAJ.sfc.zip`, the URL used by the supplied page |
| Background | `https://allancoding-files.netlify.app/snes-nes/NBAJ.jpg`, the URL used by the supplied page |
| BIOS | No separate BIOS is required or configured |
| License | EmulatorJS is GPL-3.0. No redistribution or embedding license was found for the commercial game, ROM or background image |

## Integration

- The Google Sites wrapper is not framed. Its custom embed was inspected and
  the same public EmulatorJS configuration was placed in this local launcher.
- No ROM or game artwork is stored in this repository.
- The launcher uses the existing self-hosted EmulatorJS 4.2.3 runtime and
  Snes9x core under `vendor/emulatorjs/`, including its GPL-3.0 license.
- The page's Content Security Policy permits scripts and emulator data only
  from the site itself and permits the game and background only from the host
  used by the supplied page. It blocks frames, forms, plug-ins and every other
  origin.
- The site's outer player sandboxes the launcher, prevents pop-ups and
  top-level navigation, and supplies Back and fullscreen controls.

## Limitations

- The game still needs network access to the game-file host. It will stop
  loading if that host removes the files, blocks hotlinking, changes its URLs,
  or is blocked by the visitor's network.
- The game file is streamed from a third-party host. Its provenance and the
  host's authorization to distribute it were not established.
- Keyboard, touch, multiplayer and gamepad support require live verification.

## Thumbnail

- On 2026-10-10, the site owner supplied a horse photo and requested it as
  this game's thumbnail. A cropped 640 by 360 WebP derivative is stored in the
  site's thumbnail folder. The original image's provenance and license were
  not established.
