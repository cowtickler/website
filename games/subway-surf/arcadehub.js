/* ArcadeHub glue for Subway Surf. Loaded before the game's own scripts.
   - Sizes the canvas to fit the window at 4:3 before src/game.js creates the
     WebGL context (the game never calls gl.viewport, so the size is set once).
   - Provides showMessage() and gameOver(), which src/game.js calls.
   - Runs the start / game over screen and the Grayscale / Textured buttons,
     which the original page wired up with inline onclick handlers. */
(function () {
  'use strict';

  var MAX_WIDTH = 1280; // keeps the GPU load sensible on low-end Chromebooks

  var canvas = document.getElementById('glcanvas');
  var overlay = document.getElementById('ss-overlay');
  var title = document.getElementById('ss-title');
  var text = document.getElementById('ss-text');
  var keys = document.getElementById('ss-keys');
  var play = document.getElementById('ss-play');

  var box = canvas.getBoundingClientRect();
  if (box.width > 0) {
    var ratio = window.devicePixelRatio || 1;
    var width = Math.min(MAX_WIDTH, Math.round(box.width * ratio));
    canvas.width = width;
    canvas.height = Math.round(width * 3 / 4);
  }

  function showPanel(heading, body, hint, button) {
    title.textContent = heading;
    text.textContent = body;
    keys.textContent = hint;
    keys.hidden = !hint;
    if (button) {
      play.textContent = button;
      play.hidden = false;
    } else {
      play.hidden = true;
    }
    overlay.hidden = false;
  }

  window.showMessage = function (message) {
    window.gameState = 'over';
    showPanel('Subway Surf', message, '', '');
  };

  window.gameOver = function (reachedEnd) {
    if (window.gameState === 'over') return;
    window.gameState = 'over';
    var score = 'Score: ' + window.Score + '.';
    showPanel(reachedEnd ? 'You made it to the end!' : 'Game over', score,
      'Press Enter or click Play again.', 'Play again');
  };

  function startOrRestart() {
    if (window.gameState === 'ready') {
      window.gameState = 'playing';
      overlay.hidden = true;
      play.blur();
    } else if (window.gameState === 'over') {
      window.location.reload();
    }
  }

  play.addEventListener('click', startOrRestart);
  document.addEventListener('keydown', function (event) {
    if (overlay.hidden || play.hidden) return;
    // Space starts the first run but does not restart, so a jump pressed at the
    // moment of a crash does not start a new run straight away.
    // stopImmediatePropagation keeps the game's own listener from turning the
    // starting key press into a jump.
    if (event.key === 'Enter' || (event.key === ' ' && window.gameState === 'ready')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      startOrRestart();
    }
  });

  // The toggles keep the original's behaviour. Each button gives the keyboard
  // back to the game after a click, so Space jumps instead of pressing it again.
  document.getElementById('ss-gray').addEventListener('click', function () {
    window.grayfn();
    this.blur();
  });
  document.getElementById('ss-texture').addEventListener('click', function () {
    window.texture();
    this.blur();
  });
})();
