'use strict';

(function () {

  var PRICE_MIN_VALUES = ['0', '1000', '5000', '10000'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pointerX = PIN_WIDTH / 2;

  window.data = {
    pointerX: pointerX,
    pinHeight: PIN_HEIGHT,
    priceMinValues: PRICE_MIN_VALUES
  };

})();
