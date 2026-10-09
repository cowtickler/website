# Ruffle 0.7.1 (Flash emulator), hosted with the site

Shared by every Flash game in `games/`. Each game page loads
`../../vendor/ruffle/ruffle.js`; Ruffle then loads one of the two `.wasm` files
(whichever the browser supports) and a `core.ruffle.*.js` chunk from this folder.

| | |
| --- | --- |
| Source | npm package `@ruffle-rs/ruffle` 0.7.1 (https://registry.npmjs.org/@ruffle-rs/ruffle/-/ruffle-0.7.1.tgz), the official Ruffle web build |
| Checked | tarball sha512 matched npm's published integrity value (2026-10-09) |
| License | MIT or Apache-2.0, at your option (`LICENSE_MIT`, `LICENSE_APACHE`) |
| Changes | None. The source maps (`*.map`) were left out to save space |
| Website | https://ruffle.rs |

To update: download the new tarball from npm, check its integrity, and replace
every file here (the chunk and `.wasm` file names change with each version).
