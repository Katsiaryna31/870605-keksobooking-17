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

  var onChangeFilters = window.debounce(function () {
    typePlaceSelected = typePlace.options[typePlace.selectedIndex].value;
    typePriceSelected = housePrice.options[housePrice.selectedIndex].value;
    numberRoomsSelected = numberRooms.options[numberRooms.selectedIndex].value;
    numberGuestsSelected = numberGuests.options[numberGuests.selectedIndex].value;
    featuresSelected = filters.querySelectorAll('input[name=features]:checked');
    updatePins();
  });

  filters.addEventListener('change', onChangeFilters);

  var updatePins = function () {
    var visiblePins = pins;
    window.map.removePins();
    window.card.closeElement();
    visiblePins = visiblePins.filter(function (it) {
      var isFiltered = true;
      if (typePlaceSelected && typePlaceSelected !== 'any' && it.offer.type !== typePlaceSelected) {
        isFiltered = false;
      }
      if (typePriceSelected === 'middle' && (it.offer.price < priceLimits.lowPoint || it.offer.price > priceLimits.highPoint)) {
        isFiltered = false;
      } else if (typePriceSelected === 'low' && it.offer.price >= priceLimits.lowPoint) {
        isFiltered = false;
      } else if (typePriceSelected === 'high' && it.offer.price <= priceLimits.highPoint) {
        isFiltered = false;
      }
      if (numberRoomsSelected && numberRoomsSelected !== 'any' && it.offer.rooms !== +numberRoomsSelected) {
        isFiltered = false;
      }
      if (numberGuestsSelected && numberGuestsSelected !== 'any' && numberGuestsSelected !== '0' && it.offer.guests !== +numberGuestsSelected) {
        isFiltered = false;
      } else if (numberGuestsSelected === '0' && it.offer.guests < guestsLimit) {
        isFiltered = false;
      }
      var found = 0;
      it.offer.features.forEach(function (offerFeature) {
        featuresSelected.forEach(function (selectedFeature) {
          if (offerFeature === selectedFeature.value) {
            found++;
          }
        });
      });
      if (featuresSelected.length > 0 && found !== featuresSelected.length) {
        isFiltered = false;
      }
      return isFiltered;
    });
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
