'use strict';

(function () {

  var KIND_PLACE = ['palace', 'flat', 'house', 'bungalo'];
  var PRICE_MIN_VALUE = ['0', '1000', '5000', '10000'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pointerX = PIN_WIDTH / 2;

  window.data = {
    pointerX: pointerX,
    pinHeight: PIN_HEIGHT,
    priceMinValue: PRICE_MIN_VALUE
  };

})();
