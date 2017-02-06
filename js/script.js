var docs = docs || {}; //init app

docs = (function () {
  'use strict';
  var init = function () {
    gumshoe.init({
      selector: '[data-gumshoe] a', // Default link selector (must use a valid CSS selector)
      // selectorHeader: '[data-gumshoe-header]', // Fixed header selector (must use a valid CSS selector)
      container: window, // The element to spy on scrolling in (must be a valid DOM Node)
      offset: 0, // Distance in pixels to offset calculations
      activeClass: 'active', // Class to apply to active navigation link and it's parent list item
      // callback: function (nav) {} // Callback to run after setting active link
    });
    sticyNav({
      offset: 30
    });
  };
  var sticyNav = function (data) {
    var sticyNavElement = document.getElementById('sticy-nav');
    var stop = (sticyNavElement.offsetTop - data.offset);

    window.onscroll = function (e) {
      var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      // sticyNavElement.offsetTop;

      if (scrollTop >= stop) {
        sticyNavElement.className = 'sticy';
      } else {
        sticyNavElement.className = '';
      }

    }
  }
  return {
    init: init
  }
}());

docs.init();
