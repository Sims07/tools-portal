/* GoatCounter analytics for tools-portal.
 * The site code is intentionally kept in one place so the integration is easy to replace.
 */
(function () {
  'use strict';

  var ENDPOINT = 'https://tools-portal.goatcounter.com/count';
  var script = document.createElement('script');
  script.src = 'https://gc.zgo.at/count.js';
  script.async = true;
  script.setAttribute('data-goatcounter', ENDPOINT);
  document.head.appendChild(script);

  function sendEvent(path, title) {
    var attempt = 0;
    var timer = setInterval(function () {
      attempt += 1;
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        clearInterval(timer);
        window.goatcounter.count({
          path: path,
          title: title,
          event: true,
          no_session: true
        });
      } else if (attempt >= 50) {
        clearInterval(timer);
      }
    }, 100);
  }

  function toolTitle(card) {
    var heading = card && card.querySelector('h3');
    return heading ? heading.textContent.trim() : '';
  }

  function trackTool(id, action) {
    var card = document.getElementById(id);
    if (!card) return;
    var title = toolTitle(card);
    sendEvent('tool-' + action + ':' + id, title + ' — ' + action);
  }

  function bindFavoriteTracking() {
    document.addEventListener('click', function (event) {
      var favorite = event.target.closest && event.target.closest('.fav-btn');
      if (!favorite) return;
      var id = favorite.dataset.tool;
      if (!id) return;

      // This listener runs during capture, before toggleFavorite() updates aria-pressed.
      var wasFavorite = favorite.getAttribute('aria-pressed') === 'true';
      trackTool(id, wasFavorite ? 'favorite-remove' : 'favorite-add');
    }, true);
  }

  function bindToolUsageTracking() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('.cta[href]');
      if (!link) return;
      var card = link.closest('.card');
      if (!card || !card.id) return;
      trackTool(card.id, 'open');
    }, true);
  }

  function bindGithubTracking() {
    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('.gh-link');
      if (!link) return;
      var card = link.closest('.card');
      if (!card || !card.id) return;
      trackTool(card.id, 'github');
    }, true);
  }

  // The portal uses an iframe for demos. Tracking the click gives us one
  // consistent usage metric for both embedded demos and direct external links.
  bindFavoriteTracking();
  bindToolUsageTracking();
  bindGithubTracking();
})();
