/* Plays forest-temple.swf with Ruffle (loaded from unpkg.com by index.html)
   and shows a plain message when Ruffle or the SWF cannot be loaded. */
(function () {
  'use strict';

  var SWF_URL = 'forest-temple.swf';
  var LOAD_TIMEOUT_MS = 30000;

  var holder = document.getElementById('fw-player');
  var loading = document.getElementById('fw-loading');
  var message = document.getElementById('fw-message');
  var messageText = document.getElementById('fw-message-text');

  var framed = true;
  try { framed = window.self !== window.top; } catch (e) { /* cross-origin parent */ }
  if (framed) document.documentElement.classList.add('is-framed');

  document.getElementById('fw-retry').addEventListener('click', function () {
    window.location.reload();
  });

  function showMessage(text) {
    loading.hidden = true;
    messageText.textContent = text;
    message.hidden = false;
  }

  if (window.location.protocol === 'file:') {
    showMessage('Flash games cannot run from a file on your computer. Start the local server ' +
      '(double-click start-server.bat) and open http://localhost:8000/ instead.');
    return;
  }

  if (!window.RufflePlayer || typeof window.RufflePlayer.newest !== 'function') {
    showMessage('The Flash player (Ruffle) could not be loaded. Check your internet connection ' +
      'and try again. Ruffle comes from unpkg.com, which some school or work networks block.');
    return;
  }

  function start() {
    var player = window.RufflePlayer.newest().createPlayer();
    var api = typeof player.ruffle === 'function' ? player.ruffle() : player;
    var settled = false;

    var timer = window.setTimeout(function () {
      if (!settled) showMessage('The game is taking too long to load. Check your connection and try again.');
    }, LOAD_TIMEOUT_MS);

    function fail() {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      showMessage('Ruffle could not start the game file. Try again, or use a different browser.');
    }

    player.addEventListener('loadedmetadata', function () {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      loading.hidden = true;
    });

    // No focus() calls here: Ruffle focuses its own inner element when the game is
    // clicked (the menus need a click anyway), and focusing the outer element would
    // take the keyboard away from the game.

    holder.appendChild(player);

    var result;
    try {
      result = api.load({
        url: SWF_URL,
        // The SWF has an ad loader. This limits its network APIs, and the page's
        // Content-Security-Policy blocks the ad request itself.
        allowNetworking: 'none',
        openUrlMode: 'deny',
        autoplay: 'on',
        splashScreen: false,
        letterbox: 'on',
        showSwfDownload: false,
        warnOnUnsupportedContent: false
      });
    } catch (e) {
      fail();
      return;
    }
    if (result && typeof result.catch === 'function') result.catch(fail);
  }

  fetch(SWF_URL, { method: 'HEAD', cache: 'no-cache' })
    .then(function (res) { return res.ok; }, function () { return false; })
    .then(function (found) {
      if (!found) {
        showMessage('The game file (forest-temple.swf) is missing from this website.');
        return;
      }
      try {
        start();
      } catch (e) {
        showMessage('Ruffle could not start the game file. Try again, or use a different browser.');
      }
    });
})();
