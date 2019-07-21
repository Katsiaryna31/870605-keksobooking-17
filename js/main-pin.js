'use strict';

(function () {
  window.map.mainPin.addEventListener('mouseup', function () {
    if (window.map.item.classList.contains('map--faded')) {
      window.map.item.classList.remove('map--faded');
      window.pins.render();
      window.form.activatePage();
    }
  });

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (window.map.item.classList.contains('map--faded')) {
      window.map.item.classList.remove('map--faded');
      window.form.activatePage();
    }

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

      var mainPinTop = window.map.mainPin.offsetTop - shift.y;
      var mainPinLeft = window.map.mainPin.offsetLeft - shift.x;

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

      window.map.mainPin.style.top = mainPinTop + 'px';
      window.map.mainPin.style.left = mainPinLeft + 'px';

      var mainPinPosition = (mainPinLeft + window.map.mainPinWidth / 2) + ', ' + (mainPinTop + window.map.mainPinHeight);
      window.form.domAddressElement.value = mainPinPosition;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onMainPinClick = function (onClickEvt) {
          onClickEvt.preventDefault();
          window.map.mainPin.removeEventListener('click', onMainPinClick);
        };
        window.map.mainPin.addEventListener('click', onMainPinClick);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
