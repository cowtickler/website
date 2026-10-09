# Super Mario World (EmulatorJS): ArcadeHub notes

Checked 2026-10-08. This integration was requested by the site owner from the
public page at https://sites.google.com/view/emulatorjs/games/super-mario-world.

| | |
| --- | --- |
| Game | Super Mario World (Super Nintendo) |
| Supplied page | https://sites.google.com/view/emulatorjs/games/super-mario-world |
| Emulator | EmulatorJS 4.2.3, pinned to its official CDN |
| Core | `snes` (Snes9x) |
| Game file | `https://allancoding-files.netlify.app/snes-nes/SMW.smc.zip`, the URL used by the supplied page |
| Background | `https://allancoding-files.netlify.app/snes-nes/SMW.jpg`, the URL used by the supplied page |
| License | EmulatorJS is GPL-3.0. No redistribution or embedding license was found for the commercial game, ROM or background image |

## Integration

- The Google Sites wrapper is not framed. Its custom embed was inspected and
  the same public EmulatorJS configuration was placed in this local launcher.
- No ROM, Nintendo artwork or EmulatorJS build is stored in this repository.
- EmulatorJS is pinned to stable version 4.2.3 instead of the supplied page's
  moving `latest` URL, so the loader and core stay compatible.
- The page's Content Security Policy permits scripts and data only from the
  official EmulatorJS CDN and the two game assets only from the host used by
  the supplied page. It blocks frames, forms, plug-ins and every other origin.
- The site's outer player still sandboxes the launcher, prevents pop-ups and
  top-level navigation, and supplies Back, Reload and fullscreen controls.

## Limitations

- The game needs network access. It will stop loading if either external host
  removes the files, blocks hotlinking, changes its URLs, or is blocked by the
  visitor's network.
- The game file is streamed from a third-party host. Its provenance and the
  host's authorization to distribute it were not established.
- EmulatorJS keyboard, touch and gamepad support should be available, but
  gameplay still needs a live-browser check after deployment.
