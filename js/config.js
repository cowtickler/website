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

  // Games framed from another website. Game entries are normally local paths
  // under games/. To show a game from another origin in the player, list that
  // origin here AND add it to frame-src in the Content-Security-Policy meta
  // tag of play.html. Only list sites that allow being framed.
  externalOrigins: ['https://games.engineering.com', 'https://www.y8.com']
};
