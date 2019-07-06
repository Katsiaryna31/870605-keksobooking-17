'use strict';

(function () {
  var cardsArray = [];
  var renderCards = function (advertisments) {
    var fragment = document.createDocumentFragment();

    for (var e = 0; e < advertisments.length; e++) {
      window.card.element.classList.add('hidden');
      fragment.appendChild(window.card.render(advertisments[e]));
      cardsArray.push(window.card.render(advertisments[e]));
    }
    window.pins.pinList.appendChild(fragment);
  };

  window.cards = {
    array: cardsArray,
    render: renderCards,
  };
})();
