'use strict';

(function () {

  var deactivateForm = function (element) {
    for (var m = 0; m < element.length; m++) {
      element[m].setAttribute('disabled', 'disabled');
    }
  };

  var activateForm = function (element) {
    for (var l = 0; l < element.length; l++) {
      element[l].removeAttribute('disabled', 'disabled');
    }
  };

  var addForm = document.querySelector('.ad-form');
  var addFormInsides = addForm.querySelectorAll('fieldset > input, select');
  var addFormRequiredIndides = addForm.querySelectorAll('fieldset > input:not(.feature__checkbox), select');
  deactivateForm(addFormInsides);

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInsides = mapFilters.querySelectorAll('fieldset > input, select');
  deactivateForm(mapFiltersInsides);

  for (var t = 0; t < addFormRequiredIndides.length; t++) {
    addFormRequiredIndides[t].setAttribute('required', 'required');
  }

  var activatePage = function () {
    addForm.classList.remove('ad-form--disabled');

    activateForm(mapFiltersInsides);
    activateForm(addFormInsides);
    window.map.removePins();
    window.backend.load(window.map.renderPins,  window.message.error);
  };

  var resetPage = function () {
    deactivateForm(mapFiltersInsides);
    deactivateForm(addFormInsides);
    window.map.item.classList.add('map--faded');
    addForm.classList.add('ad-form--disabled');
    window.map.mainPin.style.top = window.map.mainPinLocationY + 'px';
    window.map.mainPin.style.left = window.map.mainPinLocationX + 'px';
    addressForm.value = window.map.mainPinPositionFirst;
    window.map.removePins();
  };

  var addressForm = document.querySelector('#address');
  addressForm.setAttribute('readonly', 'readonly');
  addressForm.value = window.map.mainPinPositionFirst;

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
    for (var c = 0; c < arrayPlace.length; c++) {
      if (typePlace.selectedIndex === c) {
        price.setAttribute('min', window.data.priceMinValue[c]);
        price.placeholder = window.data.priceMinValue[c];
      }
    }
  };

  var resetForm = addForm.querySelector('.ad-form__reset');
  resetForm.addEventListener('click', function () {
    addForm.reset();
    addressForm.setAttribute('value', window.map.mainPinPositionFirst);
    resetPage();
  });

  window.form = {
    domAddressElement: addressForm,
    activatePage: activatePage
  };

})();
