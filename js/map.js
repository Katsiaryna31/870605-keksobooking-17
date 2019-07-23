'use strict';

(function () {
  var MAIN_PIN_LOCATION_X = 570;
  var MAIN_PIN_LOCATION_Y = 375;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 80;
  var MAP_TOP_SIDE = 130;
  var MAP_BOTTOM_SIDE = 630;
  var MAP_LEFT_LIMIT = 0;

  var mainPinCenterX = MAIN_PIN_LOCATION_X + MAIN_PIN_WIDTH / 2;
  var mainPinCenterY = MAIN_PIN_LOCATION_Y + MAIN_PIN_HEIGHT;
  var mainPinPositionFirst = mainPinCenterX + ',' + mainPinCenterY;

  var mainPin = document.querySelector('.map__pin--main');
  var mapSizes = window.card.pinList.getBoundingClientRect();
  var mapRightLimit = mapSizes.width - MAIN_PIN_WIDTH;
  var mapTopLimit = MAP_TOP_SIDE - MAIN_PIN_HEIGHT;
  var mapBottomLimit = MAP_BOTTOM_SIDE - MAIN_PIN_HEIGHT;
  var map = document.querySelector('.map');

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < pins.length; j++) {
      var advertPin = window.pin.take(pins, j);
      fragment.appendChild(advertPin);
    }
    window.card.pinList.appendChild(fragment);
  };

  var removePins = function () {
    var pinElemenetsList = document.querySelectorAll('.map__pin');
    pinElemenetsList.forEach(function (pinElement) {
      if (!pinElement.classList.contains('map__pin--main')) {
        pinElement.parentNode.removeChild(pinElement);
      }
    });
  };

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
    mainPinHeight: MAIN_PIN_HEIGHT,
    renderPins: renderPins,
    removePins: removePins
  };

})();
