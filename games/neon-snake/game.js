/*
 * Neon Snake: an original, dependency-free HTML5 snake game.
 *
 * Rendering is deliberately cheap for low-end Chromebooks:
 *  - the board only redraws when the snake moves (about 7-14 times a second);
 *  - the background grid and food glow are pre-rendered once per resize;
 *  - the animation loop stops completely when the game is not running.
 *
 * MIT License, see LICENSE.txt in this folder.
 */
(function () {
  'use strict';

  var GRID = 20;
  var START_STEP_MS = 150;
  var MIN_STEP_MS = 70;
  var STEP_SPEEDUP_MS = 3;
  var BEST_KEY = 'neon-snake:best';

  var DIRS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };
  var OPPOSITE = { up: 'down', down: 'up', left: 'right', right: 'left' };
  var KEY_DIRS = {
    ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
    KeyW: 'up', KeyS: 'down', KeyA: 'left', KeyD: 'right'
  };

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d', { alpha: false });
  var board = document.getElementById('board');
  var scoreEl = document.getElementById('score');
  var bestEl = document.getElementById('best');
  var overlayTitle = document.getElementById('overlay-title');
  var overlayText = document.getElementById('overlay-text');
  var overlayBtn = document.getElementById('overlay-btn');
  var pauseBtn = document.getElementById('pause-btn');
  var pauseIcon = document.getElementById('pause-icon');

  var state = 'ready';
  var snake = [];
  var dir = 'right';
  var queue = [];
  var food = { x: 0, y: 0 };
  var score = 0;
  var best = loadBest();
  var stepMs = START_STEP_MS;

  var cell = 16;
  var dpr = 1;
  var bgLayer = null;
  var foodSprite = null;
  var rafId = 0;
  var lastTime = 0;
  var acc = 0;

  // ---- Storage (optional: games keep working if storage is blocked) -------

  function loadBest() {
    try {
      var value = parseInt(window.localStorage.getItem(BEST_KEY), 10);
      return isFinite(value) && value > 0 ? value : 0;
    } catch (e) {
      return 0;
    }
  }

  function saveBest(value) {
    try { window.localStorage.setItem(BEST_KEY, String(value)); } catch (e) { /* storage unavailable */ }
  }

  // ---- State ----------------------------------------------------------------

  function setState(next) {
    state = next;
    document.body.setAttribute('data-state', next);
    var paused = next === 'paused';
    pauseBtn.setAttribute('aria-label', paused ? 'Resume' : 'Pause');
    pauseBtn.title = paused ? 'Resume (P)' : 'Pause (P)';
    pauseIcon.setAttribute('d', paused ? 'M8 5.5v13l10.5-6.5z' : 'M8 5v14M16 5v14');
    pauseBtn.disabled = next === 'ready' || next === 'over' || next === 'won';

    if (next === 'ready') {
      overlayTitle.textContent = 'Neon Snake';
      overlayText.textContent = 'Eat the glowing orbs to grow. Don’t hit the walls or your own tail.';
      overlayBtn.textContent = 'Play';
    } else if (next === 'paused') {
      overlayTitle.textContent = 'Paused';
      overlayText.textContent = 'Press P or Space, or tap Resume, to keep going.';
      overlayBtn.textContent = 'Resume';
    } else if (next === 'over' || next === 'won') {
      var newBest = score > 0 && score >= best;
      overlayTitle.textContent = next === 'won' ? 'You filled the board!' : 'Game over';
      overlayText.textContent = 'You scored ' + score + (score === 1 ? ' point.' : ' points.') +
        (newBest ? ' New best!' : ' Best: ' + best + '.');
      overlayBtn.textContent = 'Play again';
    }
  }

  function reset() {
    var mid = Math.floor(GRID / 2);
    snake = [{ x: 6, y: mid }, { x: 5, y: mid }, { x: 4, y: mid }];
    dir = 'right';
    queue = [];
    score = 0;
    stepMs = START_STEP_MS;
    scoreEl.textContent = '0';
    placeFood();
    draw();
  }

  function placeFood() {
    var free = [];
    var taken = {};
    snake.forEach(function (s) { taken[s.x + ',' + s.y] = true; });
    for (var y = 0; y < GRID; y++) {
      for (var x = 0; x < GRID; x++) {
        if (!taken[x + ',' + y]) free.push({ x: x, y: y });
      }
    }
    if (!free.length) return false;
    food = free[Math.floor(Math.random() * free.length)];
    return true;
  }

  function start() {
    if (state === 'playing') return;
    if (state === 'over' || state === 'won') reset();
    setState('playing');
    lastTime = performance.now();
    acc = 0;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function pause() {
    if (state !== 'playing') return;
    setState('paused');
    cancelAnimationFrame(rafId);
  }

  function togglePause() {
    if (state === 'playing') pause();
    else if (state === 'paused') start();
  }

  function restart() {
    cancelAnimationFrame(rafId);
    reset();
    setState('ready');
    start();
  }

  function endGame(result) {
    cancelAnimationFrame(rafId);
    if (score > best) {
      best = score;
      bestEl.textContent = String(best);
      saveBest(best);
    }
    setState(result);
    overlayBtn.focus({ preventScroll: true });
  }

  /** Primary action of the overlay button for each state. */
  function primaryAction() {
    if (state === 'ready' || state === 'paused') start();
    else if (state === 'over' || state === 'won') restart();
  }

  // ---- Input ----------------------------------------------------------------

  function queueDirection(name) {
    if (!DIRS[name]) return;
    if (state === 'over' || state === 'won') return;
    var last = queue.length ? queue[queue.length - 1] : dir;
    if (name !== last && name !== OPPOSITE[last] && queue.length < 3) queue.push(name);
    if (state === 'ready' || state === 'paused') start();
  }

  window.addEventListener('keydown', function (event) {
    var target = event.target;
    var onButton = target && target.tagName === 'BUTTON';
    var name = KEY_DIRS[event.code] || KEY_DIRS[event.key];
    if (name) {
      event.preventDefault();
      queueDirection(name);
      return;
    }
    if (event.code === 'Space' || event.key === ' ') {
      if (onButton) return; // let the focused button handle it
      event.preventDefault();
      if (state === 'playing' || state === 'paused') togglePause();
      else primaryAction();
    } else if (event.code === 'KeyP' || event.key === 'Escape') {
      if (state === 'playing' || state === 'paused') togglePause();
    } else if (event.code === 'KeyR') {
      restart();
    } else if (event.key === 'Enter' && !onButton) {
      primaryAction();
    }
  });

  overlayBtn.addEventListener('click', primaryAction);
  pauseBtn.addEventListener('click', togglePause);
  document.getElementById('restart-btn').addEventListener('click', function (event) {
    restart();
    event.currentTarget.blur();
  });

  function enableTouchUi() {
    if (document.body.classList.contains('is-touch')) return;
    document.body.classList.add('is-touch');
    resize();
  }

  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    document.body.classList.add('is-touch');
  }

  // Swipe anywhere on the board. Long swipes can turn more than once.
  var swipe = null;
  board.addEventListener('pointerdown', function (event) {
    if (event.pointerType === 'mouse') return;
    enableTouchUi();
    swipe = { x: event.clientX, y: event.clientY, id: event.pointerId, moved: false };
  });
  board.addEventListener('pointermove', function (event) {
    if (!swipe || event.pointerId !== swipe.id) return;
    var dx = event.clientX - swipe.x;
    var dy = event.clientY - swipe.y;
    var threshold = Math.max(18, cell * 0.9);
    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) return;
    queueDirection(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
    swipe.x = event.clientX;
    swipe.y = event.clientY;
    swipe.moved = true;
  });
  function endSwipe(event) {
    if (!swipe || event.pointerId !== swipe.id) return;
    // A tap (no swipe) on the board starts or resumes the game.
    if (!swipe.moved && event.type === 'pointerup' && event.target === canvas && (state === 'ready' || state === 'paused')) start();
    swipe = null;
  }
  board.addEventListener('pointerup', endSwipe);
  board.addEventListener('pointercancel', endSwipe);

  // D-pad: react on pointerdown for low latency; click covers keyboard use.
  document.querySelectorAll('.dpad-btn').forEach(function (btn) {
    btn.addEventListener('pointerdown', function (event) {
      event.preventDefault();
      enableTouchUi();
      btn.classList.add('is-pressed');
      queueDirection(btn.getAttribute('data-dir'));
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (name) {
      btn.addEventListener(name, function () { btn.classList.remove('is-pressed'); });
    });
    btn.addEventListener('click', function (event) {
      if (event.detail === 0) queueDirection(btn.getAttribute('data-dir'));
    });
  });

  // Pause automatically when the tab or window is hidden.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pause();
  });

  // ---- Game loop ------------------------------------------------------------

  function tick() {
    if (queue.length) dir = queue.shift();
    var head = snake[0];
    var next = { x: head.x + DIRS[dir].x, y: head.y + DIRS[dir].y };

    if (next.x < 0 || next.y < 0 || next.x >= GRID || next.y >= GRID) return endGame('over');

    var eating = next.x === food.x && next.y === food.y;
    // The tail moves away this step unless the snake grows.
    var bodyLength = eating ? snake.length : snake.length - 1;
    for (var i = 0; i < bodyLength; i++) {
      if (snake[i].x === next.x && snake[i].y === next.y) return endGame('over');
    }

    snake.unshift(next);
    if (eating) {
      score++;
      scoreEl.textContent = String(score);
      stepMs = Math.max(MIN_STEP_MS, stepMs - STEP_SPEEDUP_MS);
      if (!placeFood()) return endGame('won');
    } else {
      snake.pop();
    }
  }

  function loop(now) {
    if (state !== 'playing') return;
    acc += Math.min(now - lastTime, 250);
    lastTime = now;
    var moved = false;
    while (acc >= stepMs && state === 'playing') {
      acc -= stepMs;
      tick();
      moved = true;
    }
    if (moved) draw();
    if (state === 'playing') rafId = requestAnimationFrame(loop);
  }

  // ---- Rendering ------------------------------------------------------------

  function makeLayer(width, height) {
    var layer = document.createElement('canvas');
    layer.width = width;
    layer.height = height;
    return layer;
  }

  function buildBackground() {
    var size = GRID * cell * dpr;
    bgLayer = makeLayer(size, size);
    var g = bgLayer.getContext('2d');
    g.fillStyle = '#0a0e16';
    g.fillRect(0, 0, size, size);
    var c = cell * dpr;
    for (var y = 0; y < GRID; y++) {
      for (var x = 0; x < GRID; x++) {
        if ((x + y) % 2 === 0) {
          g.fillStyle = '#0d121c';
          g.fillRect(x * c, y * c, c, c);
        }
      }
    }
    g.fillStyle = '#1a2233';
    var r = Math.max(1, c * 0.06);
    for (var gy = 1; gy < GRID; gy++) {
      for (var gx = 1; gx < GRID; gx++) g.fillRect(gx * c - r, gy * c - r, r * 2, r * 2);
    }
  }

  function buildFoodSprite() {
    var c = cell * dpr;
    var size = Math.ceil(c * 2);
    foodSprite = makeLayer(size, size);
    var g = foodSprite.getContext('2d');
    var mid = size / 2;
    var glow = g.createRadialGradient(mid, mid, 0, mid, mid, mid);
    glow.addColorStop(0, 'rgba(255, 92, 138, 0.55)');
    glow.addColorStop(1, 'rgba(255, 92, 138, 0)');
    g.fillStyle = glow;
    g.fillRect(0, 0, size, size);
    g.fillStyle = '#ff5c8a';
    g.beginPath();
    g.arc(mid, mid, c * 0.34, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = 'rgba(255, 255, 255, 0.75)';
    g.beginPath();
    g.arc(mid - c * 0.1, mid - c * 0.1, c * 0.09, 0, Math.PI * 2);
    g.fill();
  }

  function roundedRect(x, y, w, h, r) {
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, w, h);
    }
  }

  // Head-to-tail colors from mint (165deg) to violet (252deg).
  function segmentColor(i, length) {
    var t = length > 1 ? i / (length - 1) : 0;
    var hue = 165 + t * 87;
    var light = 58 - t * 6;
    return 'hsl(' + hue.toFixed(0) + ', 78%, ' + light.toFixed(0) + '%)';
  }

  function draw() {
    if (!bgLayer) return;
    var c = cell * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(bgLayer, 0, 0);

    ctx.drawImage(foodSprite, food.x * c + c / 2 - foodSprite.width / 2, food.y * c + c / 2 - foodSprite.height / 2);

    var pad = Math.max(1, c * 0.08);
    for (var i = snake.length - 1; i >= 0; i--) {
      var s = snake[i];
      ctx.fillStyle = segmentColor(i, snake.length);
      roundedRect(s.x * c + pad, s.y * c + pad, c - pad * 2, c - pad * 2, c * 0.28);
    }

    // Eyes on the head, facing the current direction.
    var head = snake[0];
    var d = DIRS[dir];
    var cx = head.x * c + c / 2;
    var cy = head.y * c + c / 2;
    var off = c * 0.18;
    var fwd = c * 0.12;
    ctx.fillStyle = '#06231b';
    [-1, 1].forEach(function (side) {
      var ex = cx + d.x * fwd + (d.y !== 0 ? side * off : 0);
      var ey = cy + d.y * fwd + (d.x !== 0 ? side * off : 0);
      ctx.beginPath();
      ctx.arc(ex, ey, Math.max(1.2, c * 0.07), 0, Math.PI * 2);
      ctx.fill();
    });

    canvas.setAttribute('aria-label', 'Snake game board. Score ' + score + '.');
  }

  function resize() {
    var rect = board.getBoundingClientRect();
    var size = Math.floor(Math.min(rect.width, rect.height));
    if (size <= 0) return;
    cell = Math.max(6, Math.floor(size / GRID));
    // Cap the pixel ratio: sharper than 2x costs memory with no visible gain.
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var cssSize = cell * GRID;
    canvas.style.width = cssSize + 'px';
    canvas.style.height = cssSize + 'px';
    canvas.width = Math.round(cssSize * dpr);
    canvas.height = Math.round(cssSize * dpr);
    buildBackground();
    buildFoodSprite();
    draw();
  }

  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(function () { resize(); }).observe(board);
  } else {
    window.addEventListener('resize', resize);
  }

  // ---- Boot -------------------------------------------------------------------

  bestEl.textContent = String(best);
  reset();
  setState('ready');
  resize();
})();
