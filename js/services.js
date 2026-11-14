(function () {
  // Service buttons: one service is always open; the button for it stays pressed.
  var buttons = document.querySelectorAll('[data-service]');
  var panels = document.querySelectorAll('[data-panel]');
  var styles = window.TAB_STYLES || {};

  function open(id) {
    buttons.forEach(function (b) {
      var on = b.getAttribute('data-service') === id;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.setAttribute('style', on ? styles.active : styles.idle);
    });
    panels.forEach(function (p) {
      p.hidden = p.getAttribute('data-panel') !== id;
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { open(b.getAttribute('data-service')); });
  });

  // Links from the home page carousel (services.html#decks) open that service.
  var hash = (window.location.hash || '').replace('#', '');
  var valid = Array.prototype.some.call(buttons, function (b) { return b.getAttribute('data-service') === hash; });
  open(valid ? hash : 'concrete');
})();
