'use strict';

(function () {

  var NUMBER = 10;
  var NUMBER_ADVERTS = 8;
  var KIND_PLACE = ['palace', 'flat', 'house', 'bungalo'];
  var PRICE_MIN_VALUE = ['0', '1000', '5000', '10000'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pointerX = PIN_WIDTH / 2;

  var getAvatar = function (pictureNumber) {
    return pictureNumber < NUMBER ? 'img/avatars/user0' + pictureNumber + '.png' : 'img/avatars/user' + pictureNumber + '.png';
  };

  var getAdvert = function (serialNumberAdvert) {
    var typeLive = window.util.getRandomValue(0, KIND_PLACE.length);
    return {
      author: {
        avatar: getAvatar(serialNumberAdvert + 1)
      },
      offer: {
        type: KIND_PLACE[typeLive]
      },
      location: {
        x: window.util.getRandomValue(91, 1107) + pointerX + 'px',
        y: window.util.getRandomValue(130, 540) + PIN_HEIGHT + 'px'
      }
    };
  };

  var getAdvertising = function () {
    var advertisement = [];
    for (var i = 0; i < NUMBER_ADVERTS; i++) {
      var advert = getAdvert(i);
      advertisement.push(advert);
    }
    return advertisement;
  };

  window.data = {
    pointerX: pointerX,
    pinHeight: PIN_HEIGHT,
    getAdvertising: getAdvertising,
    priceMinValue: PRICE_MIN_VALUE
  };

})();
