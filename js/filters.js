'use strict';

(function () {

  var pins = [];

  var successLoad = function (data) {
    pins = data;
    window.map.renderPins(pins.slice(0, 5));
  };

  var filters = document.querySelector('.map__filters');

  var typePlaceSelected;
  var typePlace = filters.querySelector('#housing-type');
  typePlace.addEventListener('change', function () {
    typePlaceSelected = typePlace.options[typePlace.selectedIndex].value;
    changeTypePins(typePlaceSelected);
  });

  var changeTypePins = window.debounce(function (typePlaceValue) {
    var pinsSamePlace;
    if (typePlaceValue !== 'any') {
      window.map.removePins();
      window.card.closeElement();
      pinsSamePlace = pins.filter(function (it) {
        return it.offer.type === typePlaceValue;
      }).slice(0, 5);
    } else if (typePlaceValue === 'any') {
      window.map.removePins();
      window.card.closeElement();
      pinsSamePlace = pins.slice(0, 5);
    }
    updatePins(pinsSamePlace);
  });

  var typePriceSelected;
  var housePrice = filters.querySelector('#housing-price');
  housePrice.addEventListener('change', function () {
    typePriceSelected = housePrice.options[housePrice.selectedIndex].value;
    changePricePins(typePriceSelected);
  });

  var changePricePins = window.debounce(function (typePriceValue) {
    var pinsSamePrice;
    if (typePriceValue === 'middle') {
      window.map.removePins();
      window.card.closeElement();
      pinsSamePrice = pins.filter(function (it) {
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      }).slice(0, 5);
    } else if (typePriceValue === 'low') {
      window.map.removePins();
      window.card.closeElement();
      pinsSamePrice = pins.filter(function (it) {
        return it.offer.price < 10000;
      }).slice(0, 5);
    } else if (typePriceValue === 'high') {
      window.map.removePins();
      window.card.closeElement();
      pinsSamePrice = pins.filter(function (it) {
        return it.offer.price > 50000;
      }).slice(0, 5);
    } else if (typePriceValue === 'any') {
      window.map.removePins();
      window.card.closeElement();
      pinsSamePrice = pins.slice(0, 5);
    }
    updatePins(pinsSamePrice);
  });

  var numberRoomsSelected;
  var numberRooms = filters.querySelector('#housing-rooms');
  numberRooms.addEventListener('change', function () {
    numberRoomsSelected = numberRooms.options[numberRooms.selectedIndex].value;
    changeRoomsPins(numberRoomsSelected);
  });

  var changeRoomsPins = window.debounce(function (numberRoomsValue) {
    var pinsSameRooms;
    if (numberRoomsValue !== 'any') {
      window.map.removePins();
      window.card.closeElement();
      pinsSameRooms = pins.filter(function (it) {
        return it.offer.rooms === +numberRoomsValue;
      }).slice(0, 5);
    } else if (numberRoomsValue === 'any') {
      window.map.removePins();
      window.card.closeElement();
      pinsSameRooms = pins.slice(0, 5);
    }
    updatePins(pinsSameRooms);
  });

  var numberGuestsSelected;
  var numberGuests = filters.querySelector('#housing-guests');
  numberGuests.addEventListener('change', function () {
    numberGuestsSelected = numberGuests.options[numberGuests.selectedIndex].value;
    changeGuestsPins(numberGuestsSelected);
  });

  var changeGuestsPins = window.debounce(function (numberGuestsValue) {
    var pinsSameGuests;
    if (numberGuestsValue !== 'any' && numberGuestsValue !== '0') {
      window.map.removePins();
      window.card.closeElement();
      pinsSameGuests = pins.filter(function (it) {
        return it.offer.guests === +numberGuestsValue;
      }).slice(0, 5);
    } else if (numberGuestsValue === 'any') {
      window.map.removePins();
      window.card.closeElement();
      pinsSameGuests = pins.slice(0, 5);
    } else if (numberGuestsValue === '0') {
      window.map.removePins();
      window.card.closeElement();
      pinsSameGuests = pins.filter(function (it) {
        return it.offer.guests >= 100;
      }).slice(0, 5);
    }
    updatePins(pinsSameGuests);
  });

  var featuresSelected;
  var features = filters.querySelector('#housing-features');
  features.addEventListener('click', function () {
    featuresSelected = features.input.value;
    changeFeaturesPins(featuresSelected);
  });

  var changeFeaturesPins = window.debounce(function (featuresValue) {
    window.map.removePins();
    window.card.closeElement();
    var pinsSameFeatures = pins.filter(function (it) {
      it.offer.features.forEach(function (element) {
        return element === featuresValue;
      });
    }).slice(0, 5);
    updatePins(pinsSameFeatures);
  });

  var updatePins = function (pinsFilterSelected) {
    window.map.renderPins(pinsFilterSelected);
    typePlace.removeEventListener('change', function () {});
    housePrice.removeEventListener('change', function () {});
    numberRooms.removeEventListener('change', function () {});
    numberGuests.removeEventListener('change', function () {});
    features.removeEventListener('click', function () {});
  };

  window.filters = {
    pins: pins,
    successLoad: successLoad
  };


})();
