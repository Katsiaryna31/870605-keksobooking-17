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

  var pinList = document.querySelector('.map__pins');
  var mapSizes = pinList.getBoundingClientRect();
  var mapRightLimit = mapSizes.width - MAIN_PIN_WIDTH;
  var mapTopLimit = MAP_TOP_SIDE - MAIN_PIN_HEIGHT;
  var mapBottomLimit = MAP_BOTTOM_SIDE - MAIN_PIN_HEIGHT;

  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var pin = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderAdvert = function (oneAdvertisment) {
    var advertElement = pin.cloneNode(true);

    advertElement.style.left = oneAdvertisment.location.x;
    advertElement.style.top = oneAdvertisment.location.y;
    advertElement.querySelector('img').src = oneAdvertisment.author.avatar;

    return advertElement;
  };

  var fragment = document.createDocumentFragment();
  var advertisments = window.data.getAdvertising();
  for (var j = 0; j < advertisments.length; j++) {
    fragment.appendChild(renderAdvert(advertisments[j]));
  }
  pinList.appendChild(fragment);

  var pinElemList = document.querySelectorAll('.map__pin');
  for (var i = 0; i < pinElemList.length; i++) {
    if (!pinElemList[i].classList.contains('map__pin--main')) {
      pinElemList[i].parentNode.removeChild(pinElemList[i]);
    }
  }

  mainPin.addEventListener('mouseup', function () {
    window.form.activatePage();
  });

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    window.form.activatePage();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinTop = mainPin.offsetTop - shift.y;
      var mainPinLeft = mainPin.offsetLeft - shift.x;

      if (mainPinTop < mapTopLimit) {
        mainPinTop = mapTopLimit;
      } else if (mainPinTop > mapBottomLimit) {
        mainPinTop = mapBottomLimit;
      }

      if (mainPinLeft < MAP_LEFT_LIMIT) {
        mainPinLeft = MAP_LEFT_LIMIT;
      } else if (mainPinLeft > mapRightLimit) {
        mainPinLeft = mapRightLimit;
      }

      mainPin.style.top = mainPinTop + 'px';
      mainPin.style.left = mainPinLeft + 'px';

      var mainPinPosition = (mainPinLeft + MAIN_PIN_WIDTH / 2) + ', ' + (mainPinTop + MAIN_PIN_HEIGHT);
      window.form.addressForm.value = mainPinPosition;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (onClickEvt) {
          onClickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    map: map,
    pinElemList: pinElemList,
    pinList: pinList,
    mainPin: mainPin,
    mainPinLocationY: MAIN_PIN_LOCATION_Y,
    mainPinLocationX: MAIN_PIN_LOCATION_X,
    mainPinPositionFirst: mainPinPositionFirst
  };

})();
