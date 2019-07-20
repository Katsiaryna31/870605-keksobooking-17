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
      var selectedPlaceIndex = typePlace.selectedIndex;
      if (selectedPlaceIndex === c) {
        price.setAttribute('min', window.data.priceMinValue[c]);
        price.placeholder = window.data.priceMinValue[c];
      }
    }
  };

  price.onchange = function () {
    typePlace.onchange();
  };

  var roomNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var arrayGuests = guestsNumber.querySelectorAll('option');


  var getValidGuests = function (roomNumber) {
    if (roomNumber === 100) {
      return [0];
    } else if (roomNumber === 3) {
      return [1, 2, 3];
    } else if (roomNumber === 2) {
      return [1, 2];
    } else if (roomNumber === 1) {
      return [1];
    }
  };

  guestsNumber.onchange = function () {
    roomNumber.onchange();
  }

  roomNumber.onchange = function () {
    for (var s = 0; s < arrayGuests.length; s++) {
      arrayGuests[s].setAttribute('disabled', 'disabled');
    };
    for (var s = 0; s < arrayGuests.length; s++) {
      var room = roomNumber.options[roomNumber.selectedIndex];
      var validGuests = getValidGuests(+room.value);
      for (var t = 0; t <= validGuests.length; t++) {
        if (+arrayGuests[s].value === validGuests[t]) {
          arrayGuests[s].removeAttribute('disabled', 'disabled');
        }
      }
    };
    var selectedGuest = guestsNumber.options[guestsNumber.selectedIndex];
    validSelectedGuest(validGuests, selectedGuest);
  };

  var validSelectedGuest = function (validGuests, selectedGuest) {
    for (var v = 0; v < validGuests.length; v++) {
      var invalid = true;
      if (+selectedGuest.value === validGuests[v]) {
        invalid = false;
      }
      if (invalid) {
        guestsNumber.setCustomValidity('Количество гостей не соответствует количеству комнат');
      } else {
        guestsNumber.setCustomValidity('');
      }
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
    var errorBox = document.querySelector('.map__pin').querySelector('.error');
    var successBox =  document.querySelector('.map__pin').querySelector('.success');
    if (document.contains(errorBox)) {
      window.message.errorMessage.parentNode.removeChild(window.message.errorMessage);
    } else if (document.contains(successBox)) {
      window.message.successMessage.parentNode.removeChild(window.message.successMessage);
    }
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
