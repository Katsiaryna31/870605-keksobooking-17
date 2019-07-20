'use strict';

(function () {
  var ESC_KEYCODE = 27;
  window.util = {
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    escKeycode: ESC_KEYCODE
  }
})();
