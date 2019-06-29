'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mouseup', function () {
    window.form.activatePage();
  });

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    window.form.activatePage();

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

      var mainPinTop = mainPin.offsetTop - shift.y;
      var mainPinLeft = mainPin.offsetLeft - shift.x;

      if (mainPinTop < window.map.topLimit) {
        mainPinTop = window.map.topLimit;
      } else if (mainPinTop > window.map.bottomLimit) {
        mainPinTop = window.map.bottomLimit;
      }

      if (mainPinLeft < window.map.leftLimit) {
        mainPinLeft = window.map.leftLimit;
      } else if (mainPinLeft > window.map.rightLimit) {
        mainPinLeft = window.map.rightLimit;
      }

      mainPin.style.top = mainPinTop + 'px';
      mainPin.style.left = mainPinLeft + 'px';

      var mainPinPosition = (mainPinLeft + window.map.mainPinWidth / 2) + ', ' + (mainPinTop + window.map.mainPinHeight);
      window.form.address.value = mainPinPosition;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (onClickEvt) {
          onClickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.mainPin = mainPin;

})();
