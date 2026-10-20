// ArcadeHub: stand-in for the Poki SDK (/poki-sdk.js on the original host), which loaded Poki's
// ad and tracking code. Every call does nothing. Ad breaks finish at once, and "watch an ad for a
// reward" buttons give the reward straight away, since there are no ads on this site.
(function () {
    function done(value) { return function () { return Promise.resolve(value); }; }
    function nothing() {}
    window.PokiSDK = {
        init: done(),
        commercialBreak: done(),
        rewardedBreak: done(true),
        setDebug: nothing,
        gameLoadingStart: nothing,
        gameLoadingFinished: nothing,
        gameLoadingProgress: nothing,
        gameplayStart: nothing,
        gameplayStop: nothing,
        happyTime: nothing,
        customEvent: nothing,
        displayAd: nothing,
        destroyAd: nothing,
        getURLParam: function () { return ''; },
        shareableURL: done(''),
        isAdBlocked: function () { return false; }
    };
})();
