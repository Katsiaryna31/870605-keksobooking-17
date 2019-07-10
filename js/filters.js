'use strict';

(function () {

  var type = '';

  var filters = document.querySelector('.map__filters');
  var typePlace = filters.querySelector('#housing-type');

  typePlace.addEventListener('change', function() {
    type = typePlace.options[typePlace.selectedIndex].value;
    window.map.renderPins(type);
  });

})();
