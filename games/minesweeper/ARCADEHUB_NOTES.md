# Minesweeper — integration notes  (PUBLISHED at the owner's request despite the issues below)

| Field | Value |
| --- | --- |
| Source | https://github.com/nickarocho/minesweeper (ZIP supplied by the site owner, 2026-10-08) |
| Author | Nick Arocho |
| License | **None.** No license file in the ZIP or in the repository. Without a license the code is "all rights reserved" |
| External requests | Loaded jQuery 3.2.1 from code.jquery.com; replaced with the identical local file (same SHA-256 as the original integrity hash) |

## Known license issues (owner chose to publish anyway on 2026-10-08)
1. No license, so the site has no permission to redistribute it.
2. `css/micross.ttf` is Microsoft Sans Serif ("© 2008 Microsoft Corporation. All Rights Reserved"), which may not be redistributed.
3. The Windows 95 style images may be copied from Windows.


## Other notes
- Works when enabled (tested). Flagging needs Shift+click, so touch-only devices cannot flag.
- The game has no phone layout: its default 16x16 board is a little wider than a phone screen. It fits fine at 1366x768 and on tablets.
