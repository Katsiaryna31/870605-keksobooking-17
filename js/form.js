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
    guestsNumber[2].setAttribute('selected', 'selected');
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
    window.backend.load(window.map.successLoad, window.message.error);

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
    window.card.closeElement();
    resetForm.removeEventListener('click', cleanForm);
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
  var arrayPlaces = typePlace.querySelectorAll('option');
  typePlace.onchange = function () {
    for (var c = 0; c < arrayPlaces.length; c++) {
      if (typePlace.selectedIndex === c) {
        price.setAttribute('min', window.data.priceMinValue[c]);
        price.placeholder = window.data.priceMinValue[c];
      }
    }
  };

  var roomNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var arrayGuests = guestsNumber.querySelectorAll('option');

  roomNumber.onchange = function () {
    for (var s = 0; s < arrayGuests.length; s++) {
      arrayGuests[s].setAttribute('disabled', 'disabled');
    }
    if (roomNumber.selectedIndex === 0) {
      arrayGuests[2].removeAttribute('disabled', 'disabled');
    } else if (roomNumber.selectedIndex === 1) {
      arrayGuests[1].removeAttribute('disabled', 'disabled');
      arrayGuests[2].removeAttribute('disabled', 'disabled');
    } else if (roomNumber.selectedIndex === 2) {
      arrayGuests[0].removeAttribute('disabled', 'disabled');
      arrayGuests[1].removeAttribute('disabled', 'disabled');
      arrayGuests[2].removeAttribute('disabled', 'disabled');
    } else if (roomNumber.selectedIndex === 3) {
      arrayGuests[3].removeAttribute('disabled', 'disabled');
    }
  };

  var resetForm = addForm.querySelector('.ad-form__reset');

  var cleanForm = function () {
    addForm.reset();
    addressForm.setAttribute('value', window.map.mainPinPositionFirst);
    resetPage();

  };

  resetForm.addEventListener('click', cleanForm);

  var reloadPage = function () {
    window.location.reload();
    buttonSubmit.removeAttribute('disabled', 'disabled');
    if (window.card.pinList.classList.contains('error')) {
      window.message.errorMessage.parentNode.removeChild(window.message.errorMessage);
    } else if (window.card.pinList.classList.contains('success')) {
      window.message.successMessage.parentNode.removeChild(window.message.successMessage);
    };
    document.removeEventListener('click', reloadPage);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var buttonSubmit = addForm.querySelector('.ad-form__submit');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.escKeycode) {
      reloadPage();
    }
  };

  var successSave = function () {
    window.message.success();
    document.addEventListener('click', reloadPage);
    document.addEventListener('keydown', onPopupEscPress);
    cleanForm();
  };

  var errorSave = function () {
    window.message.error();
    document.addEventListener('click', reloadPage);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var sendData = function (evt) {
    evt.preventDefault();
    buttonSubmit.setAttribute('disabled', 'disabled');
    window.backend.save(new FormData(addForm), successSave, errorSave);
  };

  addForm.addEventListener('submit', sendData);

  window.form = {
    domAddressElement: addressForm,
    activatePage: activatePage
  };

})();
