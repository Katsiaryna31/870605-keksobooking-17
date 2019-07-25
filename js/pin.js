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

  var deactivateActivePin = function () {
    var pinElementsList = document.querySelectorAll('.map__pin');
    pinElementsList.forEach(function (pinElement) {
      pinElement.classList.remove('map__pin--active');
    });
  };

  var activatePin = function (activePin) {
    deactivateActivePin();
    activePin.classList.add('map__pin--active');
  };

  var takePin = function (advertisments, advertismentsIndex) {
    var pinElement = window.pin.renderAdvert(advertisments[advertismentsIndex]);
    pinElement.addEventListener('click', function () {
      window.pin.activate(pinElement);
      window.card.closeElement();
      window.card.showElement(advertisments[advertismentsIndex]);
    });
    return pinElement;
  };

  window.pin = {
    renderAdvert: renderAdvert,
    activate: activatePin,
    take: takePin
  };
})();
