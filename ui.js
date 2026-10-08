/*
 * Shared helpers. All text is inserted with textContent, never innerHTML,
 * so catalog data cannot inject markup.
 */
(function (AH) {
  'use strict';

  /**
   * Small element builder: el('p', {className: 'x', text: 'hi'}, [children]).
   */
  function el(tag, props, children) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (key) {
        var value = props[key];
        if (value == null || value === false) return;
        if (key === 'className') node.className = value;
        else if (key === 'text') node.textContent = value;
        else node.setAttribute(key, value === true ? '' : value);
      });
    }
    (children || []).forEach(function (child) {
      if (child == null) return;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  /** Sets the page title as "<page> · <site>" (or just the site name). */
  function setTitle(page) {
    var name = (AH.config && AH.config.siteName) || 'ArcadeHub';
    document.title = page ? page + ' · ' + name : name;
  }

  function isFileProtocol() {
    return window.location.protocol === 'file:';
  }

  var FILE_MESSAGE = 'This page was opened straight from a file, which browsers block. ' +
    'Double-click start-server.bat (or see README.md) and open http://localhost:8000/ instead.';

  AH.ui = {
    el: el,
    clear: clear,
    setTitle: setTitle,
    isFileProtocol: isFileProtocol,
    fileMessage: FILE_MESSAGE,
    initPage: function () {
      document.querySelectorAll('[data-site-name-plain]').forEach(function (node) {
        node.textContent = (AH.config && AH.config.siteName) || 'ArcadeHub';
      });
    }
  };
})(window.ArcadeHub = window.ArcadeHub || {});
