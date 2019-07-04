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

  window.cards = {
    array: cardsArray,
    render: renderCards,
    error: errorHandler
  };
})();
