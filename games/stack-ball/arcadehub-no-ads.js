// ArcadeHub: stands in for the two ad SDKs the game loaded from m.igroutka.org
// (a GameDistribution-style `gdsdk` and a GameMonetize-style `sdk`).
// Nothing is fetched and no ads are shown. The game's framework file now loads
// this file instead of those addresses, and index.html loads it first as well.
(function () {
  if (window.__arcadehubNoAds) return;
  window.__arcadehubNoAds = true;

  function resume(optionsName) {
    // The real SDKs tell the game to carry on after an ad; do that straight away.
    setTimeout(function () {
      var options = window[optionsName];
      if (options && typeof options.onEvent === 'function') {
        try { options.onEvent({ name: 'SDK_GAME_START' }); } catch (e) { /* game not ready */ }
      }
    }, 0);
  }

  var AdType = { Interstitial: 'interstitial', Rewarded: 'rewarded', Display: 'display' };
  window.gdsdk = {
    AdType: AdType,
    // Between-level ad: finish at once. "Watch an ad" rewards are granted with no ad.
    showAd: function () { resume('GD_OPTIONS'); return Promise.resolve(); },
    preloadAd: function () { return Promise.resolve(); },
    cancelAd: function () { return Promise.resolve(); },
    openConsole: function () {}
  };
  window.sdk = {
    showBanner: function () { resume('SDK_OPTIONS'); },
    play: function () {}
  };
})();
