/* GoatCounter analytics for tools-portal.
 * Event paths are stable so historical statistics remain comparable.
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
    if (!card || !card.classList.contains('card')) return;
    var title = toolTitle(card);
    sendEvent('tool-' + action + ':' + id, title + ' — ' + action);
  }

  function bindFavoriteTracking() {
    document.addEventListener('click', function (event) {
      var favorite = event.target.closest && event.target.closest('.fav-btn');
      if (!favorite) return;
      var id = favorite.dataset.tool;
      if (!id) return;

      // Capture runs before toggleFavorite() updates aria-pressed.
      var wasFavorite = favorite.getAttribute('aria-pressed') === 'true';
      trackTool(id, wasFavorite ? 'favorite-remove' : 'favorite-add');
    }, true);
  }

  function bindToolUsageTracking() {
    // External tools are opened directly. Demos are tracked by openDemo()
    // so shortcuts, shared deep links and gallery clicks all count once.
    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a.cta[href]:not(.demo-link)');
      if (!link) return;
      var card = link.closest('.card');
      if (card && card.id) trackTool(card.id, 'open');
    }, true);

    document.addEventListener('tools-portal:tool-open', function (event) {
      if (event.detail && event.detail.toolId) {
        trackTool(event.detail.toolId, 'open');
      }
    });
  }

  function bindGithubTracking() {
    document.addEventListener('click', function (event) {
      // The share button also uses .gh-link for styling: only GitHub
      // anchors are actual GitHub visits.
      var link = event.target.closest && event.target.closest('a.gh-link[href^="https://github.com/"]');
      if (!link) return;
      var card = link.closest('.card');
      if (card && card.id) trackTool(card.id, 'github');
    }, true);
  }

  function bindShareTracking() {
    document.addEventListener('click', function (event) {
      var button = event.target.closest && event.target.closest('button.share-btn');
      if (!button) return;
      var card = button.closest('.card');
      if (card && card.id) trackTool(card.id, 'share');
    }, true);
  }

  bindFavoriteTracking();
  bindToolUsageTracking();
  bindGithubTracking();
  bindShareTracking();
})();
