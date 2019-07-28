'use strict';

(function () {

  var pins = [];
  var typePlaceSelected;
  var typePriceSelected;
  var numberRoomsSelected;
  var numberGuestsSelected;
  var featuresSelected = [];
  var priceLimits = {
    lowPoint: 10000,
    highPoint: 50000
  };
  var guestsLimit = 100;
  var numberPins = 5;

  var successLoad = function (data) {
    pins = data;
    window.map.renderPins(pins.slice(0, numberPins));
    activateFilters();
  };

  var activateFilters = function () {
    filtersList.forEach(function (filterElement) {
      filterElement.removeAttribute('disabled', 'disabled');
    });
  };

  var filters = document.querySelector('.map__filters');
  var filtersList = filters.querySelectorAll('select, input');
  filtersList.forEach(function (filterElement) {
    filterElement.setAttribute('disabled', 'disabled');
  });

  var typePlace = filters.querySelector('#housing-type');
  var housePrice = filters.querySelector('#housing-price');
  var numberRooms = filters.querySelector('#housing-rooms');
  var numberGuests = filters.querySelector('#housing-guests');
  var features = filters.querySelectorAll('#housing-features > input');

  filters.addEventListener('change', window.debounce(function () {
    typePlaceSelected = typePlace.options[typePlace.selectedIndex].value;
    typePriceSelected = housePrice.options[housePrice.selectedIndex].value;
    numberRoomsSelected = numberRooms.options[numberRooms.selectedIndex].value;
    numberGuestsSelected = numberGuests.options[numberGuests.selectedIndex].value;
    featuresSelected = filters.querySelectorAll('input[name=features]:checked');
    updatePins();
  }));

  var updatePins = function () {
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
        return it.offer.price >= priceLimits.lowPoint && it.offer.price <= priceLimits.highPoint;
      });
    } else if (typePriceSelected === 'low') {
      visiblePins = visiblePins.filter(function (it) {
        return it.offer.price < priceLimits.lowPoint;
      });
    } else if (typePriceSelected === 'high') {
      visiblePins = visiblePins.filter(function (it) {
        return it.offer.price > priceLimits.highPoint;
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
        return it.offer.guests >= guestsLimit;
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

    window.map.renderPins(visiblePins.slice(0, numberPins));
  };

  var resetFilters = function () {
    filters.reset();
  };

  window.filters = {
    pins: pins,
    successLoad: successLoad,
    reset: resetFilters
  };

})();
