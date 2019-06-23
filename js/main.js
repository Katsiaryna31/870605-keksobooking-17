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
var PRICE_MIN_VALUE = ['0', '1000', '5000', '10000'];
var mainPinCenterX = MAIN_PAGE_WIDTH / 2;
var mainPinCenterY = MAIN_PIN_LOCATION_Y + MAIN_PIN_RADIUS / 2;
var mainPinPosition = mainPinCenterX + ', ' + mainPinCenterY;
var MAP_TOP_SIDE = 130;
var MAP_BOTTOM_SIDE = 540;
var MAP_LEFT_SIDE = 91;
var MAP_RIGHT_SIDE = 1107;

var getAvatar = function (pictureNumber) {
  return pictureNumber < NUMBER ? 'img/avatars/user0' + pictureNumber + '.png' : 'img/avatars/user' + pictureNumber + '.png';
};

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAdvert = function (serialNumberAdvert) {
  var typeLive = Math.floor(Math.random() * KIND_PLACE.length);
  return {
    author: {
      avatar: getAvatar(serialNumberAdvert + 1)
    },
    offer: {
      type: KIND_PLACE[typeLive]
    },
    location: {
      x: getRandomValue(91, 1107) + pointerX + 'px',
      y: getRandomValue(130, 540) + PIN_HEIGHT + 'px'
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

var map = document.querySelector('.map');

var pinList = document.querySelector('.map__pins');


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

var deactivateForm = function (element) {
  for (var m = 0; m < element.length; m++) {
    element[m].setAttribute('disabled', 'disabled');
  }
};

var activateForm = function (element) {
  for (var z = 0; z < element.length; z++) {
    element[z].removeAttribute('disabled', 'disabled');
  }
};

var addForm = document.querySelector('.ad-form');
var addFormInsides = addForm.querySelectorAll('fieldset > input, select');
var addFormRequiredIndides = addForm.querySelectorAll('fieldset > input:not(.feature__checkbox), select');
deactivateForm(addFormInsides);

var mapFilters = document.querySelector('.map__filters');
var mapFiltersInsides = mapFilters.querySelectorAll('fieldset > input, select');
deactivateForm(mapFiltersInsides);

for (var p = 0; p < addFormRequiredIndides.length; p++) {
  addFormRequiredIndides[p].setAttribute('required', 'required');
}

var addressForm = document.querySelector('#address');
addressForm.setAttribute('readonly', 'readonly');
addressForm.value = mainPinPosition;

var mainPin = document.querySelector('.map__pin--main');

var activatePage = function () {
  map.classList.remove('map--faded');
  addForm.classList.remove('ad-form--disabled');
  activateForm(mapFiltersInsides);
  activateForm(addFormInsides);
  for (var k = 0; k < pinElemList.length; k++) {
    pinList.appendChild(pinElemList[k]);
  }
};

var resetPage = function () {
  deactivateForm(mapFiltersInsides);
  deactivateForm(addFormInsides);
  map.classList.add('map--faded');
  addForm.classList.add('ad-form--disabled');
  for (var n = 0; n < pinElemList.length; n++) {
    if (!pinElemList[n].classList.contains('map__pin--main')) {
      pinElemList[n].parentNode.removeChild(pinElemList[n]);
    }
  }
};

mainPin.addEventListener('mouseup', activatePage);

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  activatePage();

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

     mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
     mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
   };

   var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault)
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
 });

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
timeIn.onchange = function () {
  timeOut.selectedIndex = timeIn.selectedIndex;
};
timeOut.onchange = function () {
  timeIn.selectedIndex = timeOut.selectedIndex;
};

var price = document.querySelector('#price');
var typePlace = document.querySelector('#type');
var arrayPlace = typePlace.querySelectorAll('option');
typePlace.onchange = function () {
  for (var b = 0; b < arrayPlace.length; b++) {
    if (typePlace.selectedIndex === b) {
      price.setAttribute('min', PRICE_MIN_VALUE[b]);
      price.placeholder = PRICE_MIN_VALUE[b];
    }
  }
};

var resetForm = addForm.querySelector('.ad-form__reset');
resetForm.addEventListener('click', function () {
  addForm.reset();
  addressForm.setAttribute('value', mainPinPosition);
  resetPage();
});
