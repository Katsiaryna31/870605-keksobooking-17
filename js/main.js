'use strict';

var NUMBER = 10;
var NUMBER_ADVERTS = 8;
var KIND_PLACE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var pointerX = PIN_WIDTH / 2;
var MAIN_PAGE_WIDTH = 1200;
var MAIN_PIN_LOCATION_Y = 375;
var MAIN_PIN_RADIUS = 156;
var mainPinCenterX = MAIN_PAGE_WIDTH / 2;
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

var fragment = document.createDocumentFragment();
var advertisments = getAdvertising();
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

var activateForm = function (element) {
  for (var m = 0; m < element.length; m++) {
    element[m].setAttribute('disabled', 'disabled');
  }
};

var deactivateForm = function (element) {
  for (var z = 0; z < element.length; z++) {
    element[z].removeAttribute('disabled', 'disabled');
  }
};

var addForm = document.querySelector('.ad-form');
var addFormInsides = addForm.querySelectorAll('fieldset > input, select');
activateForm(addFormInsides);

var mapFilters = document.querySelector('.map__filters');
var mapFiltersInsides = mapFilters.querySelectorAll('fieldset > input, select');
activateForm(mapFiltersInsides);

var addressForm = document.querySelector('#address');
addressForm.value = mainPinPosition;

var mainPin = document.querySelector('.map__pin--main');

var activatePage = function () {
  map.classList.remove('map--faded');
  addForm.classList.remove('ad-form--disabled');
  deactivateForm(mapFiltersInsides);
  deactivateForm(addFormInsides);
  for (var k = 0; k < pinElemList.length; k++) {
    pinList.appendChild(pinElemList[k]);
  }
};

mainPin.addEventListener('mouseup', activatePage);
