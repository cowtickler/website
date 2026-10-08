/*
 * Homepage: renders every ready game in data/games.json as a tile
 * (icon + name). Games load only when a tile is opened.
 */
(function (AH) {
  'use strict';

  function start() {
    AH.ui.initPage();
    var grid = document.getElementById('game-grid');
    var status = document.getElementById('status');

    AH.games.load().then(function (catalog) {
      var fragment = document.createDocumentFragment();
      catalog.games.forEach(function (game, index) {
        // The first row of icons loads right away; the rest as they scroll in.
        fragment.appendChild(AH.games.createTile(game, index < 8));
      });
      grid.appendChild(fragment);
      status.hidden = catalog.games.length > 0;
      status.textContent = 'No games yet.';
    }).catch(function (error) {
      console.error(error);
      status.textContent = AH.ui.isFileProtocol()
        ? AH.ui.fileMessage
        : 'The games could not be loaded. Check your connection and refresh the page.';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})(window.ArcadeHub = window.ArcadeHub || {});
