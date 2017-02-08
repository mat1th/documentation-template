docs.nav = (function () {
  'use strict';
  var init = function () {

    // enable the sticy nav
    sticyNav({
      offset: 30
    });

    //enable the mobile nav
    mobileNav();
  };

  var gumshoeStarter = function () {
    gumshoe.init({
     selector: '.navigation-list a',
      offset: 360, // Distance in pixels to offset calculations
      callback: function () { // Callback to run after setting active link
        document.body.classList.remove('show-nav');
      }
    });
  };

  var sticyNav = function (data) {

    var sticyNavElement = docs.helper.select('#sticy-nav');

    var stop = (sticyNavElement.offsetTop - data.offset);

    window.onscroll = function () {
      var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      // sticyNavElement.offsetTop;

      if (scrollTop >= stop) {
        sticyNavElement.className = 'sticy';
      } else {
        sticyNavElement.className = '';
      }
    };
  };

  var mobileNav = function () {
    var navButton = document.getElementById('nav-toggle');

    navButton.addEventListener('click', function () {
      document.body.classList.toggle('show-nav');
    });
  };
  return {
    init: init,
    gumshoeStarter: gumshoeStarter
  };
}());
