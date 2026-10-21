// ArcadeHub: stands in for the GameDistribution ad SDK. The game adds a <script id="gamedistribution-jssdk">
// for it on load (the copy we got pointed it at https://yell0wsuit.page); because this file's
// <script> tag already has that id, the game adds nothing and nothing is fetched from other websites.
// No ads are shown, and "watch an ad" buttons (revive, shield, mech) give their reward straight away.
(function () {
  function gameStart() {
    // What the real SDK sends when an ad ends: the game then closes its "ad" screen.
    try { window.GD_OPTIONS.onEvent({ name: 'SDK_GAME_START' }); } catch (e) { /* game not ready */ }
  }
  window.gdsdk = {
    preloadAd: function () { return Promise.resolve(); },
    showAd: function (type) {
      if (type !== 'rewarded') Promise.resolve().then(gameStart);
      return Promise.resolve();
    }
  };
  // Google's H5 ad API, which the game also calls in a few places.
  window.adBreak = function (o) {
    setTimeout(function () {
      if (o.beforeReward) {
        o.beforeReward(function () { if (o.adViewed) o.adViewed(); });
      }
      if (o.afterAd) o.afterAd();
      if (o.adBreakDone) o.adBreakDone({ breakStatus: 'noAdPreloaded' });
    }, 0);
  };
})();
