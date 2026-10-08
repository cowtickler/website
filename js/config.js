/*
 * ArcadeHub site configuration.
 * Colors live at the top of css/style.css (the :root block).
 * The <title> tags in index.html and play.html hold the same name for
 * browsers with JavaScript off; update them too when you rename the site.
 */
window.ArcadeHub = window.ArcadeHub || {};

window.ArcadeHub.config = {
  siteName: 'cowticklers games',

  // Catalog of every game. Paths are relative to the site root, so the site
  // works at https://username.github.io/repository-name/.
  catalogUrl: 'data/games.json',

  // How long the player waits before offering to reload a slow game.
  slowLoadMs: 15000,

  // Optional external hosting (future). Game entries must normally be local
  // paths under games/. To host a game on another origin, list that origin
  // here (for example 'https://games.example.com') AND add it to frame-src
  // in the Content-Security-Policy meta tag of play.html.
  externalOrigins: []
};
