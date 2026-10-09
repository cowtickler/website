# Subway Surfers (Poki): ArcadeHub notes

Checked 2026-10-09. No game files are stored here. The catalog entry
(`"embeddable": false`) makes the player show a "Play on Poki" button that
opens the official page in a new tab.

| | |
| --- | --- |
| Game | Subway Surfers, by SYBO (Denmark) |
| Official web version | https://poki.com/en/g/subway-surfers (Poki, SYBO's web partner) |
| License | Proprietary. No embed program, no license for other sites |
| Thumbnail | `assets/thumbnails/subway-surfers.webp`, original artwork drawn for this site (not SYBO's) |

## Can it play inside this site? No.

- **Poki's page refuses to be framed.** On 2026-10-09 the page sent
  `content-security-policy: frame-ancestors https://*.poki.io http://localhost:1234 http://localhost:11001 http://localhost:8080/`
  (scanned with securityheaders.com, because the build machine cannot reach
  poki.com). No `X-Frame-Options`. Browsers refuse to show the page inside any
  other site, including `cowtickler.github.io`. Chromium, given that exact
  header, refused to frame it from this site ("Refused to frame
  'https://poki.com/' because an ancestor violates ... frame-ancestors") and
  allowed it only from `http://localhost:8080`, as the header says.
- **No official embed.** The game page has no embed code, and Poki's FAQ and
  developer docs offer none.
- **Poki's terms forbid it** (https://poki.com/en/c/terms-of-use): "You are not
  allowed to use any content from our Website, without asking us first." and
  "You may not copy, modify, create derivative works of, publicly display or
  perform, republish, ... store, transmit or distribute any of the material on
  this Website without the prior written consent of Poki."
- **Not done, on purpose:** framing Poki's inner game URL directly, proxying,
  or re-hosting a downloaded copy. Each would work around Poki's restriction
  and SYBO's copyright.

Playing it inside this site would need written permission from Poki (and
likely SYBO), for example a distribution partnership.

## School networks

Opening the game in a new tab does not get around network filters. If
poki.com is blocked (Securly, GoGuardian and similar school filters often
block game sites), the new tab shows the filter's block page instead. This
site cannot detect that reliably without contacting poki.com on every visit,
so the player says it in words instead.

## Controls (on Poki)

Arrows left/right change lanes, up jumps, down rolls, Space uses the
hoverboard. On touch screens: swipe left/right, up, down; double tap for the
hoverboard.
