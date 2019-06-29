'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var advertisments = window.data.getAdvertising();
  for (var j = 0; j < advertisments.length; j++) {
    fragment.appendChild(window.pin.renderAdvert(advertisments[j]));
  }
  window.map.pinList.appendChild(fragment);

  var pinElemList = document.querySelectorAll('.map__pin');
  for (var k = 0; k < pinElemList.length; k++) {
    if (!pinElemList[k].classList.contains('map__pin--main')) {
      pinElemList[k].parentNode.removeChild(pinElemList[k]);
    }
  }

  window.pins = {
    elemList: pinElemList
  };
})();
