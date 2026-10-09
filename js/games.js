/*
 * Game catalog: loads data/games.json, validates every entry, and renders
 * game tiles. Invalid entries are skipped with a console warning instead of
 * breaking the site. See ADDING_GAMES.md for the full field reference.
 */
(function (AH) {
  'use strict';

  var ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;
  var PERFORMANCE = ['light', 'medium', 'heavy'];
  var LOW_END = ['good', 'fair', 'poor', 'unknown'];
  var STATUSES = ['ready', 'review', 'disabled'];

  var catalogPromise = null;

  // ---- Validation helpers -------------------------------------------------

  function str(value, max) {
    if (typeof value !== 'string') return '';
    value = value.trim();
    return max ? value.slice(0, max) : value;
  }

  /**
   * Accepts a relative path inside the site (no protocol, no leading slash,
   * no ".." segments). Returns the path or '' when unsafe.
   */
  function safeLocalPath(value) {
    value = str(value, 300);
    if (!value) return '';
    if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return '';
    if (value.charAt(0) === '/' || value.indexOf('\\') !== -1) return '';
    if (value.split(/[/?#]/).indexOf('..') !== -1) return '';
    return value;
  }

  /** Accepts only https:// URLs (for repository and license links). */
  function safeHttpsUrl(value) {
    value = str(value, 500);
    if (!value) return '';
    try {
      var url = new URL(value);
      return url.protocol === 'https:' ? url.href : '';
    } catch (e) {
      return '';
    }
  }

  /**
   * Game entry: a local path under games/, or an https URL. An external game
   * shown in the player's frame must use an allow-listed origin; one marked
   * "embeddable": false is never framed (the player links to it instead).
   */
  function safeEntry(value, embeddable) {
    var local = safeLocalPath(value);
    if (local) return local.indexOf('games/') === 0 ? local : '';
    var url = safeHttpsUrl(value);
    if (!url) return '';
    if (!embeddable) return url;
    var allowed = (AH.config && AH.config.externalOrigins) || [];
    return allowed.indexOf(new URL(url).origin) !== -1 ? url : '';
  }

  function parseRatio(value) {
    var match = /^(\d{1,4})\s*[:/]\s*(\d{1,4})$/.exec(str(value, 20));
    if (!match) return null;
    var w = Number(match[1]);
    var h = Number(match[2]);
    if (!w || !h) return null;
    var ratio = w / h;
    return ratio >= 0.3 && ratio <= 4 ? { w: w, h: h } : null;
  }

  function oneOf(value, allowed, fallback) {
    return allowed.indexOf(value) !== -1 ? value : fallback;
  }

  function normalizeGame(raw, categoryIds, warn) {
    if (!raw || typeof raw !== 'object') return warn('entry is not an object');
    var id = str(raw.id);
    if (!ID_PATTERN.test(id)) return warn('invalid id "' + id + '" (use lowercase letters, numbers and dashes)');
    var title = str(raw.title, 80);
    if (!title) return warn(id + ': missing title');
    var embeddable = raw.embeddable !== false;
    var entry = safeEntry(raw.entry, embeddable);
    if (!entry) return warn(id + ': entry must be a relative path inside games/');

    var cats = Array.isArray(raw.categories) ? raw.categories : (raw.category ? [raw.category] : []);
    cats = cats.filter(function (c) {
      var ok = typeof c === 'string' && categoryIds.indexOf(c) !== -1;
      if (!ok) warn(id + ': unknown category "' + c + '" ignored');
      return ok;
    });

    var input = raw.input || {};
    var compat = raw.compatibility || {};
    var source = raw.source || {};
    var controls = Array.isArray(raw.controls) ? raw.controls : [];

    return {
      id: id,
      title: title,
      description: str(raw.description, 400),
      categories: cats,
      tags: (Array.isArray(raw.tags) ? raw.tags : [])
        .map(function (t) { return str(t, 30); })
        .filter(Boolean)
        .slice(0, 12),
      thumbnail: safeLocalPath(raw.thumbnail),
      entry: entry,
      isExternal: /^https:/.test(entry),
      embeddable: embeddable,
      titleBar: raw.titleBar === true || /^https:/.test(entry),
      openInPlayer: raw.openInPlayer !== false,
      aspectRatio: parseRatio(raw.aspectRatio),
      input: {
        keyboard: input.keyboard === true,
        touch: input.touch === true,
        mouse: input.mouse === true,
        gamepad: input.gamepad === true
      },
      fullscreen: raw.fullscreen !== false,
      featured: raw.featured === true,
      popular: raw.popular === true,
      controls: controls
        .filter(function (c) { return c && typeof c === 'object'; })
        .map(function (c) { return { keys: str(c.keys, 60), action: str(c.action, 120) }; })
        .filter(function (c) { return c.keys && c.action; })
        .slice(0, 16),
      compatibility: {
        performance: oneOf(compat.performance, PERFORMANCE, 'medium'),
        lowEnd: oneOf(compat.lowEnd, LOW_END, 'unknown'),
        notes: str(compat.notes, 400)
      },
      isolation: raw.isolation === 'strict' ? 'strict' : 'standard',
      source: {
        type: str(source.type, 20) || 'third-party',
        author: str(source.author, 100),
        authorUrl: safeHttpsUrl(source.authorUrl),
        repository: safeHttpsUrl(source.repository),
        platform: str(source.platform, 40),
        url: safeHttpsUrl(source.url),
        license: str(source.license, 60),
        licenseUrl: safeLocalPath(source.licenseUrl) || safeHttpsUrl(source.licenseUrl)
      },
      added: /^\d{4}-\d{2}-\d{2}$/.test(raw.added) ? raw.added : '',
      status: oneOf(raw.status, STATUSES, 'ready')
    };
  }

  function normalizeCatalog(raw) {
    if (!raw || typeof raw !== 'object' || !Array.isArray(raw.games)) {
      throw new Error('The game catalog is not in the expected format.');
    }
    var warnings = [];
    function warn(message) {
      warnings.push(message);
      return null;
    }

    var categories = (Array.isArray(raw.categories) ? raw.categories : [])
      .map(function (c) {
        return c && ID_PATTERN.test(c.id) && str(c.name, 40) ? { id: c.id, name: str(c.name, 40) } : null;
      })
      .filter(Boolean);
    var categoryIds = categories.map(function (c) { return c.id; });

    var all = [];
    var byId = {};
    raw.games.forEach(function (rawGame) {
      var game = normalizeGame(rawGame, categoryIds, warn);
      if (!game) return;
      if (byId[game.id]) {
        warn(game.id + ': duplicate id, later entry ignored');
        return;
      }
      byId[game.id] = game;
      all.push(game);
    });

    if (warnings.length) console.warn('[catalog] ' + warnings.join('\n[catalog] '));

    var categoryNames = {};
    categories.forEach(function (c) { categoryNames[c.id] = c.name; });

    return {
      categories: categories,
      categoryNames: categoryNames,
      /** Playable games only (status "ready"), in catalog order. */
      games: all.filter(function (g) { return g.status === 'ready'; }),
      /** Looks up any valid entry, including ones under review. */
      get: function (id) { return Object.prototype.hasOwnProperty.call(byId, id) ? byId[id] : null; },
      warnings: warnings
    };
  }

  /** Loads the catalog once per page. Rejects with a readable Error. */
  function load() {
    if (catalogPromise) return catalogPromise;
    var url = (AH.config && AH.config.catalogUrl) || 'data/games.json';
    catalogPromise = fetch(url, { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) throw new Error('The game catalog could not be loaded (HTTP ' + response.status + ').');
        return response.json();
      })
      .then(normalizeCatalog);
    return catalogPromise;
  }

  // ---- Presentation -----------------------------------------------------

  function playUrl(game) {
    return 'play.html?id=' + encodeURIComponent(game.id);
  }

  function hashHue(text) {
    var h = 0;
    for (var i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 360;
    return h;
  }

  /** Placeholder art for games without a usable thumbnail. */
  function placeholder(game) {
    var initials = game.title
      .split(/\s+/)
      .map(function (w) { return w.charAt(0); })
      .join('')
      .slice(0, 2)
      .toUpperCase();
    var node = AH.ui.el('div', { className: 'thumb-placeholder', 'aria-hidden': 'true' }, [
      AH.ui.el('span', { text: initials })
    ]);
    node.style.setProperty('--ph-hue', String(hashHue(game.id)));
    return node;
  }

  /** Lazy-loaded thumbnail that falls back to a placeholder if it fails. */
  function thumbnail(game, eager) {
    if (!game.thumbnail) return placeholder(game);
    var img = AH.ui.el('img', {
      src: game.thumbnail,
      alt: '',
      width: 320,
      height: 180,
      loading: eager ? 'eager' : 'lazy',
      decoding: 'async'
    });
    img.addEventListener('error', function () {
      if (img.parentNode) img.parentNode.replaceChild(placeholder(game), img);
    }, { once: true });
    return img;
  }

  /**
   * One game tile: its icon and its name, linking to the player, or straight
   * to the game's page when it has "openInPlayer": false.
   */
  function createTile(game, eager) {
    var href = game.openInPlayer ? playUrl(game) : game.entry;
    var link = AH.ui.el('a', { className: 'tile', href: href }, [
      AH.ui.el('div', { className: 'tile-thumb' }, [thumbnail(game, eager)]),
      AH.ui.el('span', { className: 'tile-name', text: game.title })
    ]);
    return AH.ui.el('li', null, [link]);
  }

  AH.games = {
    load: load,
    normalizeCatalog: normalizeCatalog,
    createTile: createTile,
    playUrl: playUrl,
    isValidId: function (id) { return typeof id === 'string' && ID_PATTERN.test(id); }
  };
})(window.ArcadeHub = window.ArcadeHub || {});
