docs.start = (function () {
  'use strict';

  var init = function () {
    //get the content from the site
    docs.content.init();

    //enable the nav JS;
    docs.nav.init();
  };

  return {
    init: init
  };
}());

docs.start.init();
