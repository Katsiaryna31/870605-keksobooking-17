'use strict';

(function () {
  var pinList = document.querySelector('.map__pins');
  var pinsArray = [];
  var renderPins = function (advertisments) {
    var fragment = document.createDocumentFragment();

    for (var d = 0; d < advertisments.length; d++) {
      fragment.appendChild(window.pin.renderAdvert(advertisments[d]));
      pinsArray.push(window.pin.renderAdvert(advertisments[d]));
    }
    pinList.appendChild(fragment);
  };

  var removePins = function () {
    var pinElemList = document.querySelectorAll('.map__pin');
    for (var k = 0; k < pinElemList.length; k++) {
      if (!pinElemList[k].classList.contains('map__pin--main')) {
        pinElemList[k].parentNode.removeChild(pinElemList[k]);
      }
    }
  };


  window.pins = {
    pinList: pinList,
    array: pinsArray,
    render: renderPins,
    remove: removePins,
  };
})();
