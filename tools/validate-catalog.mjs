#!/usr/bin/env node
/*
 * Checks data/games.json against the files on disk.
 * Optional developer tool: the website itself never needs Node.js.
 *
 *   node tools/validate-catalog.mjs
 *
 * Exits with code 1 when it finds an error, so it is safe to run before
 * every commit.
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const ID = /^[a-z0-9][a-z0-9-]{0,63}$/;
const PERFORMANCE = ['light', 'medium', 'heavy'];
const LOW_END = ['good', 'fair', 'poor', 'unknown'];
const STATUSES = ['ready', 'review', 'disabled'];

function isLocal(p) {
  return typeof p === 'string' && p && !/^[a-z][a-z0-9+.-]*:/i.test(p) && !p.startsWith('/') &&
    !p.includes('\\') && !p.split(/[/?#]/).includes('..');
}

function fileExists(p) {
  const clean = p.split(/[?#]/)[0];
  const full = normalize(join(root, clean));
  return full.startsWith(root) && existsSync(full) && statSync(full).isFile();
}

let catalog;
try {
  catalog = JSON.parse(readFileSync(join(root, 'data/games.json'), 'utf8'));
} catch (e) {
  console.error('data/games.json is not valid JSON:\n  ' + e.message);
  process.exit(1);
}

const categories = Array.isArray(catalog.categories) ? catalog.categories : [];
const categoryIds = categories.map((c) => c.id);
categories.forEach((c) => {
  if (!ID.test(c.id || '')) err(`category "${c.id}": invalid id`);
  if (!c.name) err(`category "${c.id}": missing name`);
});

if (!Array.isArray(catalog.games)) {
  err('"games" must be an array');
  catalog.games = [];
}

const seen = new Set();
for (const g of catalog.games) {
  const id = g && g.id;
  const where = `game "${id}"`;
  if (!ID.test(id || '')) { err(`${where}: id must be lowercase letters, numbers and dashes`); continue; }
  if (seen.has(id)) err(`${where}: duplicate id`);
  seen.add(id);
  if (!g.title) err(`${where}: missing title`);
  if (!g.description) warn(`${where}: no description`);

  if (g.embeddable === false && /^https:\/\/[^/\s]+/.test(g.entry || '')) { /* official site, linked not framed */ }
  else if (!isLocal(g.entry) || !g.entry.startsWith('games/')) err(`${where}: entry must be a relative path inside games/`);
  else if (!fileExists(g.entry)) err(`${where}: entry file not found: ${g.entry}`);
  else if (!g.entry.startsWith(`games/${id}/`)) warn(`${where}: entry is not inside games/${id}/ (recommended layout)`);

  if (!g.thumbnail) warn(`${where}: no thumbnail (a placeholder will be shown)`);
  else if (!isLocal(g.thumbnail)) err(`${where}: thumbnail must be a relative path`);
  else if (!fileExists(g.thumbnail)) err(`${where}: thumbnail not found: ${g.thumbnail}`);
  else if (statSync(join(root, g.thumbnail)).size > 150 * 1024) warn(`${where}: thumbnail is over 150 KB; compress it (WebP, 640x360)`);

  const cats = g.categories || (g.category ? [g.category] : []);
  if (!cats.length) warn(`${where}: no category`);
  cats.forEach((c) => { if (!categoryIds.includes(c)) err(`${where}: unknown category "${c}"`); });

  const input = g.input || {};
  if (!input.keyboard && !input.touch && !input.mouse && !input.gamepad) warn(`${where}: no input methods listed`);

  const compat = g.compatibility || {};
  if (compat.performance && !PERFORMANCE.includes(compat.performance)) err(`${where}: performance must be one of ${PERFORMANCE.join(', ')}`);
  if (compat.lowEnd && !LOW_END.includes(compat.lowEnd)) err(`${where}: lowEnd must be one of ${LOW_END.join(', ')}`);
  if (g.status && !STATUSES.includes(g.status)) err(`${where}: status must be one of ${STATUSES.join(', ')}`);
  if (g.isolation && !['standard', 'strict'].includes(g.isolation)) err(`${where}: isolation must be "standard" or "strict"`);
  if (g.aspectRatio && !/^\d{1,4}\s*[:/]\s*\d{1,4}$/.test(g.aspectRatio)) err(`${where}: aspectRatio must look like "16:9"`);

  const src = g.source || {};
  if (!src.license) err(`${where}: source.license is required (use "review" status until it is known)`);
  if (src.type !== 'original' && !src.author) warn(`${where}: source.author missing`);
  if (src.type !== 'original' && g.embeddable !== false && !src.repository) warn(`${where}: source.repository missing`);
  if (src.licenseUrl && isLocal(src.licenseUrl) && !fileExists(src.licenseUrl)) err(`${where}: license file not found: ${src.licenseUrl}`);
  if ((g.status || 'ready') === 'ready' && src.type !== 'original' && !src.licenseUrl) warn(`${where}: no licenseUrl; link the game's license file`);
}

for (const w of warnings) console.log('warning: ' + w);
for (const e of errors) console.log('ERROR:   ' + e);
const ready = catalog.games.filter((g) => (g.status || 'ready') === 'ready').length;
console.log(`\n${catalog.games.length} game(s), ${ready} ready, ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
