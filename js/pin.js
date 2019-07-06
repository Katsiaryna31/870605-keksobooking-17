'use strict';

(function () {
  var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderAdvert = function (oneAdvertisment) {
    var advertElement = pin.cloneNode(true);

    advertElement.style.left = oneAdvertisment.location.x + 'px';
    advertElement.style.top = oneAdvertisment.location.y + 'px';
    advertElement.querySelector('img').src = oneAdvertisment.author.avatar;

    return advertElement;
  };

  var activatePin = function (activePin) {
    activePin.classList.add('.map__pin--active');
  };


  window.pin = {
    renderAdvert: renderAdvert,
    activate: activatePin
  };

})();
