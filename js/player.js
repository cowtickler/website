/*
 * Player page (play.html?id=<game-id>).
 * Loads exactly one game into one sandboxed iframe that fills the window,
 * with a back button and fullscreen.
 */
(function (AH) {
  'use strict';

  var cfg = AH.config || {};
  var $ = function (id) { return document.getElementById(id); };

  // Sandbox presets. Neither allows top-level navigation or popups, so a game
  // cannot send the player away from this site.
  //   standard: same-origin, so games can save progress and load their own
  //             data files. Same-origin code is NOT isolated from the site,
  //             which is why every game is reviewed before it is added.
  //   strict:   opaque origin. Safer, but the game cannot use localStorage,
  //             IndexedDB or fetch() of its own files.
  var SANDBOX = {
    standard: 'allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-modals allow-orientation-lock',
    strict: 'allow-scripts allow-pointer-lock'
  };

  var game = null;
  var frame = null;
  var slowTimer = null;
  var pseudoFullscreen = false;

  function showLoading(show) {
    $('player-loading').hidden = !show;
  }

  function showError(text, canRetry) {
    clearTimeout(slowTimer);
    showLoading(false);
    $('player-error-text').textContent = text;
    $('error-retry').hidden = !canRetry;
    $('player-error').hidden = false;
  }

  function focusGame() {
    if (!frame) return;
    try {
      frame.focus();
      if (frame.contentWindow) frame.contentWindow.focus();
    } catch (e) { /* cross-origin focus can throw in strict mode */ }
  }

  // ---- Loading ---------------------------------------------------------------

  /** Confirms the entry file exists so a missing game shows a clear message. */
  function checkEntry(entry) {
    if (/^https:/.test(entry)) return Promise.resolve(true);
    return fetch(entry, { method: 'HEAD', cache: 'no-cache' })
      .then(function (response) { return response.ok; })
      .catch(function () { return false; });
  }

  function onFrameLoad() {
    if (!frame || !frame.getAttribute('src')) return;
    clearTimeout(slowTimer);
    showLoading(false);
    $('player-error').hidden = true;
    focusGame();
  }

  function createFrame() {
    // Only ever one game instance on this page.
    if (frame) return frame;
    frame = document.createElement('iframe');
    frame.className = 'player-frame';
    frame.id = 'game-frame';
    frame.title = game.title;
    frame.setAttribute('sandbox', SANDBOX[game.isolation] || SANDBOX.standard);
    frame.setAttribute('allow', 'fullscreen; gamepad; autoplay');
    frame.setAttribute('referrerpolicy', 'no-referrer');
    frame.addEventListener('load', onFrameLoad);
    $('frame-wrap').appendChild(frame);
    return frame;
  }

  function loadGame() {
    $('player-error').hidden = true;
    showLoading(true);
    checkEntry(game.entry).then(function (ok) {
      if (!ok) {
        showError(AH.ui.isFileProtocol()
          ? AH.ui.fileMessage
          : 'This game’s files are missing or could not be reached.', !AH.ui.isFileProtocol());
        return;
      }
      createFrame();
      clearTimeout(slowTimer);
      slowTimer = setTimeout(function () {
        showError('This game is taking a long time to load.', true);
      }, cfg.slowLoadMs || 15000);
      frame.setAttribute('src', game.entry);
    });
  }

  // ---- Fullscreen ------------------------------------------------------------

  function nativeElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  function nativeAvailable() {
    var stage = $('player-stage');
    return Boolean((document.fullscreenEnabled || document.webkitFullscreenEnabled) &&
      (stage.requestFullscreen || stage.webkitRequestFullscreen));
  }

  /** Fallback for browsers without element fullscreen (iPhone Safari). */
  function setPseudo(on) {
    pseudoFullscreen = on;
    $('player-stage').classList.toggle('is-pseudo-fullscreen', on);
    focusGame();
  }

  function enterFullscreen() {
    var stage = $('player-stage');
    if (!nativeAvailable()) return setPseudo(true);
    var request = stage.requestFullscreen || stage.webkitRequestFullscreen;
    try {
      var result = request.call(stage);
      if (result && typeof result.catch === 'function') result.catch(function () { setPseudo(true); });
    } catch (e) {
      setPseudo(true);
    }
  }

  function exitFullscreen() {
    if (pseudoFullscreen) return setPseudo(false);
    var exit = document.exitFullscreen || document.webkitExitFullscreen;
    if (exit && nativeElement()) {
      var result = exit.call(document);
      if (result && typeof result.catch === 'function') result.catch(function () {});
    }
  }

  function bindFullscreen() {
    $('fullscreen-btn').addEventListener('click', enterFullscreen);
    $('fs-exit').addEventListener('click', exitFullscreen);
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(function (name) {
      document.addEventListener(name, focusGame);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && pseudoFullscreen) setPseudo(false);
    });
  }

  /** Back returns to the previous page when it was this site's game list. */
  function bindBack() {
    $('back-btn').addEventListener('click', function (event) {
      if (event.ctrlKey || event.metaKey || event.shiftKey) return;
      try {
        var ref = new URL(document.referrer);
        var base = window.location.pathname.replace(/play\.html$/, '');
        if (ref.origin === window.location.origin && ref.pathname.replace(/index\.html$/, '') === base &&
            window.history.length > 1) {
          event.preventDefault();
          window.history.back();
        }
      } catch (e) { /* no referrer: follow the link */ }
    });
  }

  // ---- Start -----------------------------------------------------------------

  function start() {
    AH.ui.initPage();
    bindBack();
    bindFullscreen();
    $('error-retry').addEventListener('click', function () {
      loadGame();
    });
    $('player-stage').addEventListener('click', function (event) {
      if (event.target === $('player-stage') || event.target === $('frame-wrap')) focusGame();
    });

    var id = new URLSearchParams(window.location.search).get('id') || '';

    AH.games.load().then(function (catalog) {
      game = AH.games.isValidId(id) ? catalog.get(id) : null;
      if (!game) {
        AH.ui.setTitle('Game not found');
        showError('That game could not be found.', false);
        return;
      }
      AH.ui.setTitle(game.title);
      $('game-title').textContent = game.title;
      if (game.status !== 'ready') {
        showError('This game is not available right now.', false);
        return;
      }
      if (!game.openInPlayer) {
        // This game runs on its own page, not in the player (for example a game
        // that refuses to run inside a frame). Go there instead.
        window.location.replace(game.entry);
        return;
      }
      if (game.aspectRatio) {
        var stage = $('player-stage');
        stage.classList.add('has-ratio');
        stage.style.setProperty('--ratio', String(game.aspectRatio.w / game.aspectRatio.h));
      }
      $('fullscreen-btn').hidden = !game.fullscreen;
      loadGame();
    }).catch(function (error) {
      console.error(error);
      showError(AH.ui.isFileProtocol() ? AH.ui.fileMessage : 'The game list could not be loaded.', false);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})(window.ArcadeHub = window.ArcadeHub || {});
