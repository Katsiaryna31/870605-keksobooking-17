'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var typePlace = filters.querySelector('#housing-type');

  typePlace.addEventListener('change', function () {
    var type = typePlace.options[typePlace.selectedIndex].value;
    window.map.renderPins(type);
  });

  var housePrice = filters.querySelector('#housing-price');

  housePrice.addEventListener('change', function () {
    var price = housePrice.options[housePrice.selectedIndex].value;
    window.map.renderPins(price);
  });

})();
