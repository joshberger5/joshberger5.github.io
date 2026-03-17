(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');

  if (!toggle || !links) return;

  // Toggle mobile menu
  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a nav link is clicked
  var navAnchors = links.querySelectorAll('a');
  navAnchors.forEach(function (anchor) {
    anchor.addEventListener('click', function () {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside the nav
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#nav')) {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}());
