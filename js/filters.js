'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var typePlace = filters.querySelector('#housing-type');
  typePlace.addEventListener('change', function() {
    if (typePlace.option[typePlace.selectedIndex].value = 'bungalo') {
      window.map.pins
      .filter(function(it) {
        return pin.offer.type === 'bungalo'
      })
      .slice(0, 5);
      window.map.renderPins(typeBungaloPins);
    }
    console.log(window.map.pins)
  });


  })();
