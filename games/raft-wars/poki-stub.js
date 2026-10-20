// ArcadeHub: stands in for the Poki SDK (ads and tracking), which this copy does not load.
// js/plugin-api-poki.js only calls the methods below. Nothing here contacts another website.
(function () {
    function done() { return Promise.resolve(); }
    function nothing() {}
    window.PokiSDK = {
        init: done,
        setDebug: nothing,
        gameLoadingStart: nothing,
        gameLoadingProgress: nothing,
        gameLoadingFinished: nothing,
        gameplayStart: nothing,
        gameplayStop: nothing,
        happyTime: nothing,
        commercialBreak: done,
        // There is no ad to watch, so the bonus button gives its bonus straight away.
        rewardedBreak: function () { return Promise.resolve(true); },
        displayAd: nothing,
        destroyAd: nothing
    };
})();
