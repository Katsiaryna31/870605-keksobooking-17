'use strict';

(function () {
  var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderAdvert = function (oneAdvertisment) {
    var advertElement = pin.cloneNode(true);
    console.log(oneAdvertisment);
    advertElement.style.left = oneAdvertisment.location.x;
    advertElement.style.top = oneAdvertisment.location.y;
    advertElement.querySelector('img').src = oneAdvertisment.author.avatar;

    return advertElement;
  };

  window.pin = {
    renderAdvert: renderAdvert,
  };

})();
