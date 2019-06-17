'use strict';

var NUMBER = 10;
var NUMBER_ADVERTS = 8;
var KIND_PLACE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var pointerX = PIN_WIDTH / 2;
var MAIN_PIN_LOCATION_X = 570;
var MAIN_PIN_LOCATION_Y = 375;
var MAIN_PIN_RADIUS = 156;
var mainPinCenterX = MAIN_PIN_LOCATION_X + MAIN_PIN_RADIUS / 2;
var mainPinCenterY = MAIN_PIN_LOCATION_Y + MAIN_PIN_RADIUS / 2;
var mainPinPosition = mainPinCenterX + ', ' + mainPinCenterY;

var getAvatar = function (pictureNumber) {
  return pictureNumber < NUMBER ? 'img/avatars/user0' + pictureNumber + '.png' : 'img/avatars/user' + pictureNumber + '.png';
};

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getOneAdvert = function (serialNumberAdvert) {
  var typeLive = Math.floor(Math.random() * KIND_PLACE.length);
  return {
    author: {
      avatar: getAvatar(serialNumberAdvert + 1)
    },
    offer: {
      type: KIND_PLACE[typeLive]
    },
    location: {
      x: getRandomValue(1, 1200) + pointerX + 'px',
      y: getRandomValue(130, 630) + PIN_HEIGHT + 'px'
    }
  };
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

var pinList = document.querySelector('.map__pins');


var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderAdvert = function (oneAdvertisment) {
  var oneAdvertElement = pin.cloneNode(true);

  oneAdvertElement.style.left = oneAdvertisment.location.x;
  oneAdvertElement.style.top = oneAdvertisment.location.y;
  oneAdvertElement.querySelector('img').src = oneAdvertisment.author.avatar;

  return oneAdvertElement;
};

var takePinList = function () {
  var fragment = document.createDocumentFragment();
  var advertisments = getAdvertising();
  for (var j = 0; j < advertisments.length; j++) {
    fragment.appendChild(renderAdvert(advertisments[j]));
  }
  pinList.appendChild(fragment);
};

var plusAttribute = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].setAttribute('disabled', 'disabled');
  }
};

var minusAttribute = function (element) {
  for (var i = 0; i < element.length; i++) {
    element[i].removeAttribute('disabled', 'disabled');
  }
};

var addForm = document.querySelector('.ad-form');
var addFormInsides = addForm.querySelectorAll('fieldset > input, select');
plusAttribute(addFormInsides);

var mapFilters = document.querySelector('.map__filters');
var mapFiltersInsides = mapFilters.querySelectorAll('fieldset > input, select');
plusAttribute(mapFiltersInsides);

var addressForm = document.querySelector('#address');

var mainPin = document.querySelector('.map__pin--main');

mainPin.addEventListener('mouseup', function () {
  activatePage();
});

var activatePage = function () {
  map.classList.remove('map--faded');
  takePinList();
  addForm.classList.remove('ad-form--disabled');
  minusAttribute(mapFiltersInsides);
  minusAttribute(addFormInsides);
  addressForm.value = mainPinPosition;
};
