'use strict';

var NUMBER = 10;
var NUMBER_ADVERTS = 8;

var getAvatar = function (k) {
  return k < NUMBER ? 'img/avatars/user' + '0' + k + '.png' : 'img/avatars/user' + k + '.png';
};

var KIND_PLACE = ['palace', 'flat', 'house', 'bungalo'];

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getOneAdvert = function (z) {
  var typeLive = Math.floor(Math.random() * KIND_PLACE.length);
  var oneAdvert = {
    author: {
      avatar: getAvatar(z + 1)
    },
    offer: {
      type: KIND_PLACE[typeLive]
    },
    location: {
      x: getRandomValue(1, 1200) + 'px',
      y: getRandomValue(130, 630) + 'px'
    }
  };
  return oneAdvert;
};

var getAdvertising = function () {
  var advertisement = [];
  for (var i = 0; i < NUMBER_ADVERTS; i++) {
    var oneAd = getOneAdvert(i);
    advertisement.push(oneAd);
  }
  return advertisement;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinList = document.querySelector('.map__pins');

var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderAdvert = function (oneAdvertisment) {
  var oneAdvertElement = pin.cloneNode(true);

  oneAdvertElement.style.left = oneAdvertisment.location.x;
  oneAdvertElement.style.top = oneAdvertisment.location.y;
  oneAdvertElement.querySelector('img').src = oneAdvertisment.author.avatar;
  oneAdvertElement.querySelector('img').alt = oneAdvertisment.offer.type;

  return oneAdvertElement;
};

var fragment = document.createDocumentFragment();
var advertisments = getAdvertising();
for (var j = 0; j < advertisments.length; j++) {
  fragment.appendChild(renderAdvert(advertisments[j]));
}
pinList.appendChild(fragment);
