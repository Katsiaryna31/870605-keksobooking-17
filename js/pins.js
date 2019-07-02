'use strict';

(function () {
  var renderPins = function (advertisments) {
    var fragment = document.createDocumentFragment();
    console.log(advertisments);
    for (var d = 0; d < 4; d++) {
      fragment.appendChild(window.pin.renderAdvert(advertisments[d]));
    }
    window.map.pinList.appendChild(fragment);
  };

  var removePins = function () {
    var pinElemList = document.querySelectorAll('.map__pin');
    for (var k = 0; k < pinElemList.length; k++) {
      if (!pinElemList[k].classList.contains('map__pin--main')) {
        pinElemList[k].parentNode.removeChild(pinElemList[k]);
      }
    }
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 400px auto; width: 500px; text-align: center; background-color: blue;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.pins = {
    render: renderPins,
    remove: removePins,
    error: errorHandler
  };
})();
