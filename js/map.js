'use strict';

(function () {
  var MAIN_PIN_LOCATION_X = 570;
  var MAIN_PIN_LOCATION_Y = 375;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 80;
  var mainPinCenterX = MAIN_PIN_LOCATION_X + MAIN_PIN_WIDTH / 2;
  var mainPinCenterY = MAIN_PIN_LOCATION_Y + MAIN_PIN_HEIGHT;
  var mainPinPositionFirst = mainPinCenterX + ',' + mainPinCenterY;
  var MAP_TOP_SIDE = 130;
  var MAP_BOTTOM_SIDE = 630;
  var MAP_LEFT_LIMIT = 0;


  var mainPin = document.querySelector('.map__pin--main');
  var mapSizes = window.pins.pinList.getBoundingClientRect();
  var mapRightLimit = mapSizes.width - MAIN_PIN_WIDTH;
  var mapTopLimit = MAP_TOP_SIDE - MAIN_PIN_HEIGHT;
  var mapBottomLimit = MAP_BOTTOM_SIDE - MAIN_PIN_HEIGHT;

  var map = document.querySelector('.map');

  for (var g = 0; g < window.pins.array.length; g++) {
    if (window.pins.array[g].addEventListener('click', window.pin.activate)) {
      window.cards.array[g].classList.remove('hidden');
    }
  }

  window.map = {
    item: map,
    mainPin: mainPin,
    mainPinLocationY: MAIN_PIN_LOCATION_Y,
    mainPinLocationX: MAIN_PIN_LOCATION_X,
    mainPinPositionFirst: mainPinPositionFirst,
    topLimit: mapTopLimit,
    rightLimit: mapRightLimit,
    bottomLimit: mapBottomLimit,
    leftLimit: MAP_LEFT_LIMIT,
    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT
  };

})();
