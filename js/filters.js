'use strict';

(function () {

  var pins = [];
  var typePlaceSelected;
  var typePriceSelected;
  var numberRoomsSelected;
  var numberGuestsSelected;
  var featuresSelected = [];

  var successLoad = function (data) {
    pins = data;
    window.map.renderPins(pins.slice(0, 5));
  };

  var filters = document.querySelector('.map__filters');

  var typePlace = filters.querySelector('#housing-type');
  typePlace.addEventListener('change', function () {
    typePlaceSelected = typePlace.options[typePlace.selectedIndex].value;
    updatePins();
  });

  var housePrice = filters.querySelector('#housing-price');
  housePrice.addEventListener('change', function () {
    typePriceSelected = housePrice.options[housePrice.selectedIndex].value;
    updatePins();
  });

  var numberRooms = filters.querySelector('#housing-rooms');
  numberRooms.addEventListener('change', function () {
    numberRoomsSelected = numberRooms.options[numberRooms.selectedIndex].value;
    updatePins();
  });

  var numberGuests = filters.querySelector('#housing-guests');
  numberGuests.addEventListener('change', function () {
    numberGuestsSelected = numberGuests.options[numberGuests.selectedIndex].value;
    updatePins();
  });

  var features = filters.querySelectorAll('#housing-features > input');
  var featuresList = Array.from(features);
  featuresList.forEach(function (element) {
    element.addEventListener('change', function () {
      if (element.checked) {
        featuresSelected.push(element.value);
      } else {
        featuresSelected = featuresSelected.filter(function (feature) {
          return feature !== element.value;
        });
      }
      updatePins();
    });
  });

  var updatePins = window.debounce(function () {
    var visiblePins = pins;
    window.map.removePins();
    window.card.closeElement();
    if (typePlaceSelected && typePlaceSelected !== 'any') {
      visiblePins = visiblePins.filter(function (it) {
        return it.offer.type === typePlaceSelected;
      });
    }
    if (typePriceSelected === 'middle') {
      visiblePins = visiblePins.filter(function (it) {
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      });
    } else if (typePriceSelected === 'low') {
      visiblePins = visiblePins.filter(function (it) {
        return it.offer.price < 10000;
      });
    } else if (typePriceSelected === 'high') {
      visiblePins = visiblePins.filter(function (it) {
        return it.offer.price > 50000;
      });
    }

    if (numberRoomsSelected && numberRoomsSelected !== 'any') {
      visiblePins = visiblePins.filter(function (it) {
        return it.offer.rooms === +numberRoomsSelected;
      });
    }

    if (numberGuestsSelected && numberGuestsSelected !== 'any' && numberGuestsSelected !== '0') {
      visiblePins = visiblePins.filter(function (it) {
        return it.offer.guests === +numberGuestsSelected;
      });
    } else if (numberGuestsSelected === '0') {
      visiblePins = visiblePins.filter(function (it) {
        return it.offer.guests >= 100;
      });
    }

    if (featuresSelected.length > 0) {
      visiblePins = visiblePins.filter(function (it) {
        var found = 0;
        it.offer.features.forEach(function (offerFeature) {
          featuresSelected.forEach(function (selectedFeature) {
            if (offerFeature === selectedFeature) {
              found++;
            }
          });
        });
        return found === featuresSelected.length;
      });
    }

    window.map.renderPins(visiblePins.slice(0, 5));
    typePlace.removeEventListener('change', function () { });
    housePrice.removeEventListener('change', function () { });
    numberRooms.removeEventListener('change', function () { });
    numberGuests.removeEventListener('change', function () { });
    featuresList.forEach(function (element) {
      element.removeEventListener('change', function () { });
    });
  });

  window.filters = {
    pins: pins,
    successLoad: successLoad
  };

})();
