'use strict';

(function () {

  var deactivateForm = function (formElement) {
    formElement.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };

  var activateForm = function (formElement) {
    formElement.forEach(function (element) {
      element.removeAttribute('disabled', 'disabled');
    });
    guestsList[2].setAttribute('selected', 'selected');

  };

  var addForm = document.querySelector('.ad-form');
  var addFormInsides = addForm.querySelectorAll('input, select, button');
  var addFormRequiredInsides = addForm.querySelectorAll('fieldset > input:not(.feature__checkbox), select');
  deactivateForm(addFormInsides);

  addFormRequiredInsides.forEach(function (element) {
    element.setAttribute('required', 'required');
  });

  var activatePage = function () {
    addForm.classList.remove('ad-form--disabled');

    activateForm(addFormInsides);
    window.map.removePins();
    window.backend.load(window.filters.successLoad, window.notice.showError);
  };

  var resetPage = function () {
    deactivateForm(addFormInsides);
    window.map.item.classList.add('map--faded');
    addForm.classList.add('ad-form--disabled');
    window.map.mainPin.style.top = window.map.mainPinLocationY + 'px';
    window.map.mainPin.style.left = window.map.mainPinLocationX + 'px';
    addressForm.value = window.map.mainPinPositionFirst;
    window.map.removePins();
    window.card.closeElement();
    var pictureList = document.querySelectorAll('.ad-form__photo > img');
    pictureList.forEach(function (pictureElement) {
      pictureElement.parentNode.removeChild(pictureElement);
    });
    window.avatar.preview.src = 'img/muffin-grey.svg';
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
  var placesList = typePlace.querySelectorAll('option');

  typePlace.onchange = function () {
    for (var k = 0; k < placesList.length; k++) {
      var selectedPlaceIndex = typePlace.selectedIndex;
      if (selectedPlaceIndex === k) {
        price.setAttribute('min', window.data.priceMinValues[k]);
        price.placeholder = window.data.priceMinValues[k];
      }
    }
  };

  price.onchange = function () {
    typePlace.onchange();
  };

  var roomNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');
  var guestsList = guestsNumber.querySelectorAll('option');


  var getValidGuests = function (roomValue) {
    var roomValueValid;
    if (roomValue === 100) {
      roomValueValid = [0];
    } else if (roomValue === 3) {
      roomValueValid = [1, 2, 3];
    } else if (roomValue === 2) {
      roomValueValid = [1, 2];
    } else if (roomValue === 1) {
      roomValueValid = [1];
    }
    return roomValueValid;
  };

  guestsNumber.onchange = function () {
    roomNumber.onchange();
  };

  roomNumber.onchange = function () {
    guestsList.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
    for (var l = 0; l < guestsList.length; l++) {
      var room = roomNumber.options[roomNumber.selectedIndex];
      var validGuests = getValidGuests(+room.value);
      for (var j = 0; j <= validGuests.length; j++) {
        if (+guestsList[l].value === validGuests[j]) {
          guestsList[l].removeAttribute('disabled', 'disabled');
        }
      }
    }
    var selectedGuest = guestsNumber.options[guestsNumber.selectedIndex];
    validSelectedGuest(validGuests, selectedGuest);
  };

  var validSelectedGuest = function (validGuests, selectedGuest) {
    for (var t = 0; t < validGuests.length; t++) {
      var invalid = true;
      if (+selectedGuest.value <= validGuests[t]) {
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

  var onFormClean = function () {
    addForm.reset();
    addressForm.setAttribute('value', window.map.mainPinPositionFirst);
    resetPage();
  };

  var onPageReload = function () {
    resetPage();
    buttonSubmit.removeAttribute('disabled', 'disabled');
    var errorBox = document.querySelector('.error');
    var successBox = document.querySelector('.success');
    if (document.contains(errorBox)) {
      window.notice.errorMessage.parentNode.removeChild(window.notice.errorMessage);
    } else if (document.contains(successBox)) {
      window.notice.successMessage.parentNode.removeChild(window.notice.successMessage);
    }
    document.removeEventListener('click', onPageReload);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var buttonSubmit = addForm.querySelector('.ad-form__submit');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.escKeycode) {
      onPageReload();
    }
  };

  var saveSuccess = function () {
    window.notice.showSuccess();
    document.addEventListener('click', onPageReload);
    document.addEventListener('keydown', onPopupEscPress);
    onFormClean();
  };

  var saveError = function () {
    window.notice.showError();
    document.addEventListener('click', onPageReload);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onDataSend = function (evt) {
    evt.preventDefault();
    buttonSubmit.setAttribute('disabled', 'disabled');
    window.backend.save(new FormData(addForm), saveSuccess, saveError);
  };

  resetForm.addEventListener('click', onFormClean);
  addForm.addEventListener('submit', onDataSend);

  window.form = {
    domAddressElement: addressForm,
    activatePage: activatePage
  };

})();
