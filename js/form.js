'use strict';

(function () {

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

  var activatePage = function () {
    window.map.map.classList.remove('map--faded');
    addForm.classList.remove('ad-form--disabled');

    activateForm(mapFiltersInsides);
    activateForm(addFormInsides);
    for (var k = 0; k < window.map.pinElemList.length; k++) {
        window.map.pinList.appendChild(window.map.pinElemList[k]);
    }
  };

  var resetPage = function () {
    deactivateForm(mapFiltersInsides);
    deactivateForm(addFormInsides);
    window.map.map.classList.add('map--faded');
    addForm.classList.add('ad-form--disabled');
    window.map.mainPin.style.top = window.map.mainPinLocationY + 'px';
    window.map.mainPin.style.left = window.map.mainPinLocationX + 'px';
    addressForm.value = window.map.mainPinPositionFirst;

    for (var n = 0; n < window.map.pinElemList.length; n++) {
      if (!window.map.pinElemList[n].classList.contains('map__pin--main')) {
        window.map.pinElemList[n].parentNode.removeChild(window.map.pinElemList[n]);
      }
    }
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
    for (var b = 0; b < arrayPlace.length; b++) {
      if (typePlace.selectedIndex === b) {
        price.setAttribute('min', window.data.priceMinValue[b]);
        price.placeholder = window.data.priceMinValue[b];
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
    addressForm: addressForm,
    activatePage: activatePage
  };

})();
