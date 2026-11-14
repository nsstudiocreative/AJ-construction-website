(function () {
  // Estimate form: opens the visitor's email app with the request filled in,
  // addressed to AJ Construction. Replace with a form service to receive
  // submissions (and photo uploads) without the visitor's email app.
  var TO = 'ajconstruction23inc@gmail.com';
  var form = document.getElementById('estimateForm');
  var sent = document.getElementById('formSent');
  var reset = document.getElementById('formReset');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var service = f.service.value;
    if (service === 'Choose a service') {
      f.service.setCustomValidity('Choose a service.');
      f.service.reportValidity();
      return;
    }
    var reach = (form.querySelector('input[name="reach"]:checked') || {}).value || 'text';
    var body = [
      'Name: ' + f.name.value,
      'Phone: ' + f.phone.value,
      'Email: ' + f.email.value,
      'Town or ZIP code: ' + f.town.value,
      'Service: ' + service,
      'Best way to reach me: ' + reach,
      '',
      'Project details:',
      f.details.value,
      '',
      f.photos && f.photos.files.length ? 'I have photos of the project and will attach them to this email.' : ''
    ].join('\n');
    var subject = 'Estimate request: ' + service + ' (' + f.town.value + ')';
    window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    form.hidden = true;
    if (sent) sent.hidden = false;
  });

  form.elements.service.addEventListener('change', function () { this.setCustomValidity(''); });

  if (reset) {
    reset.addEventListener('click', function () {
      form.reset();
      form.hidden = false;
      if (sent) sent.hidden = true;
    });
  }
})();
