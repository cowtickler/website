// ArcadeHub: stands in for the Poki SDK that the original page loaded. It shows no ads and contacts
// no other website. Every call finishes straight away; rewarded "watch an ad" breaks count as watched.
(function () {
    function done() { return Promise.resolve(); }
    function nothing() {}
    window.PokiSDK = {
        init: done,
        initWithVideoHB: done,
        commercialBreak: done,
        rewardedBreak: function () { return Promise.resolve(true); },
        displayAd: nothing,
        destroyAd: nothing,
        getLeaderboard: done,
        getSharableURL: function () { return Promise.reject(); },
        getURLParam: function () { return ""; },
        customEvent: nothing
    };
    ["disableProgrammatic", "gameLoadingStart", "gameLoadingFinished", "gameInteractive", "roundStart",
     "roundEnd", "muteAd", "setDebug", "gameplayStart", "gameplayStop", "gameLoadingProgress", "happyTime",
     "setPlayerAge", "togglePlayerAdvertisingConsent", "logError", "sendHighscore",
     "setDebugTouchOverlayController"].forEach(function (name) {
        window.PokiSDK[name] = nothing;
    });
})();
