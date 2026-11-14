(function () {
  // Hero zoom (100% to 120% and back) and the auto-scrolling services strip.
  var hero = document.getElementById('heroBg');
  var track = document.getElementById('svcTrack');
  var dup = document.getElementById('svcDup');
  var paused = false;
  var x = 0;
  var t0 = performance.now();
  var last = t0;

  if (track) {
    ['mouseenter', 'focusin'].forEach(function (ev) { track.addEventListener(ev, function () { paused = true; }); });
    ['mouseleave', 'focusout'].forEach(function (ev) { track.addEventListener(ev, function () { paused = false; }); });
  }

  function step(now) {
    var dt = Math.min(64, now - last);
    last = now;
    if (hero) {
      var p = ((now - t0) / 24000) % 1;
      var s = 1 + 0.1 * (1 - Math.cos(p * 2 * Math.PI));
      hero.style.transform = 'scale(' + s.toFixed(4) + ')';
    }
    if (track && dup && !paused) {
      var first = track.firstElementChild;
      var loop = first ? dup.offsetLeft - first.offsetLeft : 0;
      x -= dt * 0.05;
      if (loop > 0 && -x >= loop) x += loop;
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px, 0, 0)';
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  // Before and after comparison.
  var range = document.getElementById('baRange');
  var after = document.getElementById('baAfter');
  var handle = document.getElementById('baHandle');
  var title = document.getElementById('baTitle');
  var place = document.getElementById('baPlace');
  var tabs = document.querySelectorAll('[data-proj]');
  var styles = window.BA_STYLES || {};
  var projects = window.BA_PROJECTS || [];

  function setPos(v) {
    if (after) after.style.clipPath = 'inset(0 0 0 ' + v + '%)';
    if (handle) handle.style.left = v + '%';
  }

  if (range) {
    range.addEventListener('input', function () { setPos(range.value); });
  }

  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var i = Number(btn.getAttribute('data-proj'));
      var p = projects[i];
      tabs.forEach(function (b) {
        var on = b === btn;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.setAttribute('style', on ? styles.active : styles.idle);
      });
      document.querySelectorAll('.ba-tab').forEach(function (el) { el.textContent = p.tab; });
      if (title) title.textContent = p.title;
      if (place) place.textContent = p.place;
      if (range) range.value = 50;
      setPos(50);
    });
  });
})();
