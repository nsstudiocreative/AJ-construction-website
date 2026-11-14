(function () {
  // Estimate form: posts straight to FormSubmit, which emails the request
  // (with any attached photos) to ajconstruction23inc@gmail.com, then sends
  // the visitor back here with ?sent=1 to show the confirmation.
  var form = document.getElementById('estimateForm');
  var sent = document.getElementById('formSent');
  var reset = document.getElementById('formReset');
  var next = document.getElementById('formNext');
  if (!form) return;

  var here = window.location.href.split('#')[0].split('?')[0];
  if (next) next.value = here + '?sent=1';

  if (/[?&]sent=1/.test(window.location.search)) {
    form.hidden = true;
    if (sent) sent.hidden = false;
  }

  var service = form.elements.service;
  var photos = form.elements.attachment;

  form.addEventListener('submit', function (e) {
    if (service.value === 'Choose a service') {
      e.preventDefault();
      service.setCustomValidity('Choose a service.');
      service.reportValidity();
      return;
    }
    if (photos && photos.files.length) {
      var total = 0;
      for (var i = 0; i < photos.files.length; i++) total += photos.files[i].size;
      if (total > 10 * 1024 * 1024) {
        e.preventDefault();
        photos.setCustomValidity('Photos must be 10 MB or less in total.');
        photos.reportValidity();
        return;
      }
    }
  });

  service.addEventListener('change', function () { this.setCustomValidity(''); });
  if (photos) photos.addEventListener('change', function () { this.setCustomValidity(''); });

  if (reset) {
    reset.addEventListener('click', function () {
      form.reset();
      form.hidden = false;
      if (sent) sent.hidden = true;
      if (window.history && window.history.replaceState) window.history.replaceState(null, '', here);
    });
  }
})();
