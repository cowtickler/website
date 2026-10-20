// ArcadeHub: stands in for /poki-sdk.js, which the original host loaded from its site root.
// That loader fetched Poki's ad SDK from the host; here nothing is fetched and no ads are shown.
// The game calls these through its PokiPlatform wrapper (assets/main/index.bd586.js).
(function () {
  function done(value) {
    // The game pauses all sounds before an "ad" and never resumes them itself.
    try { window.cc.audioEngine.resumeAll(); } catch (e) { /* engine not ready */ }
    return value;
  }
  function resolved() { return Promise.resolve(); }
  function nothing() {}
  window.PokiSDK = {
    init: resolved,
    initWithVideoHB: resolved,
    isAdBlocked: function () { return false; },
    // Between-level ad: finish straight away.
    commercialBreak: function () { return Promise.resolve().then(function () { return done(); }); },
    // "Watch an ad" buttons (extra tube, undos, coins): grant the reward with no ad.
    rewardedBreak: function () { return Promise.resolve().then(function () { return done(true); }); },
    shareableURL: function () { return Promise.reject(); },
    getSharableURL: function () { return Promise.reject(); },
    getURLParam: function () { return ''; },
    gameLoadingStart: nothing,
    gameLoadingFinished: nothing,
    gameLoadingProgress: nothing,
    gameplayStart: nothing,
    gameplayStop: nothing,
    happyTime: nothing,
    customEvent: nothing,
    setDebug: nothing,
    logError: nothing
  };
})();
