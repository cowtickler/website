# Super Mario World (EmulatorJS): ArcadeHub notes

Checked 2026-10-08. This integration was requested by the site owner from the
public page at https://sites.google.com/view/emulatorjs/games/super-mario-world.

| | |
| --- | --- |
| Game | Super Mario World (Super Nintendo) |
| Supplied page | https://sites.google.com/view/emulatorjs/games/super-mario-world |
| Emulator | EmulatorJS 4.2.3, self-hosted from the official built release |
| Core | `snes` (Snes9x) |
| Game file | `https://allancoding-files.netlify.app/snes-nes/SMW.smc.zip`, the URL used by the supplied page |
| Background | `https://allancoding-files.netlify.app/snes-nes/SMW.jpg`, the URL used by the supplied page |
| License | EmulatorJS is GPL-3.0. No redistribution or embedding license was found for the commercial game, ROM or background image |

## Integration

- The Google Sites wrapper is not framed. Its custom embed was inspected and
  the same public EmulatorJS configuration was placed in this local launcher.
- No ROM or Nintendo artwork is stored in this repository.
- The required files from the official EmulatorJS 4.2.3 built release are
  stored under `vendor/emulatorjs/`. The loader, UI, English localization,
  archive extraction code and SNES9x core variants are included with their
  GPL-3.0 license. Other console cores are omitted.
- The page's Content Security Policy permits scripts and data only from the
  site itself and permits the two game assets only from the host used by the
  supplied page. It blocks frames, forms, plug-ins and every other origin.
- The site's outer player still sandboxes the launcher, prevents pop-ups and
  top-level navigation, and supplies Back, Reload and fullscreen controls.

## Limitations

- The game still needs network access to the game-file host. It will stop
  loading if that host removes the files, blocks hotlinking, changes its URLs,
  or is blocked by the visitor's network.
- The game file is streamed from a third-party host. Its provenance and the
  host's authorization to distribute it were not established.
- EmulatorJS keyboard, touch and gamepad support should be available, but
  gameplay still needs a live-browser check after deployment.
