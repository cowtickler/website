// ArcadeHub: stands in for /poki-sdk.js and Poki's ad SDK, which the original host loaded from its site root.
// Nothing is fetched and no ads are shown. unity-2020.js and the game's Poki plug-in
// (Build/f5f926b8469fb93664d78809a76685ef.js) call these.
(function () {
  function resolved() { return Promise.resolve(); }
  function nothing() {}
  window.PokiSDK = {
    init: resolved,
    initWithVideoHB: resolved,
    isAdBlocked: function () { return false; },
    // Between-round ad: finish straight away.
    commercialBreak: resolved,
    // "Watch an ad" rewards: grant the reward with no ad.
    rewardedBreak: function () { return Promise.resolve(true); },
    shareableURL: function () { return Promise.reject(); },
    getSharableURL: function () { return Promise.reject(); },
    getURLParam: function () { return ''; },
    getLanguage: function () { return (navigator.language || 'en').split('-')[0]; },
    getLeaderboard: resolved,
    displayAd: nothing,
    destroyAd: nothing,
    disableProgrammatic: nothing,
    gameLoadingStart: nothing,
    gameLoadingFinished: nothing,
    gameLoadingProgress: nothing,
    gameInteractive: nothing,
    gameplayStart: nothing,
    gameplayStop: nothing,
    roundStart: nothing,
    roundEnd: nothing,
    muteAd: nothing,
    happyTime: nothing,
    customEvent: nothing,
    sendHighscore: nothing,
    setDebug: nothing,
    setDebugTouchOverlayController: nothing,
    setPlayerAge: nothing,
    togglePlayerAdvertisingConsent: nothing,
    logError: nothing
  };
})();
