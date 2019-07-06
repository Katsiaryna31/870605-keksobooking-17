'use strict';

(function () {
  var card = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCard = function (oneCard) {
    var cardElement = card.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = oneCard.author.avatar;
    cardElement.querySelector('.popup__title').value = oneCard.offer.title;
    cardElement.querySelector('.popup__text--address').value = oneCard.offer.title;

    cardElement.querySelector('.popup__text--price').value = oneCard.offer.price;
    cardElement.querySelector('.popup__type').value = oneCard.offer.type;
    cardElement.querySelector('.popup__text--capacity').value = oneCard.offer.rooms + ' комнаты для ' + oneCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').value = 'Заезд после ' + oneCard.offer.checkin + ', выезд до ' + oneCard.offer.checkout;


    cardElement.querySelector('.popup__description').value = oneCard.offer.description;
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      closeCard();
    });
    return cardElement;
  };

  var fragment = document.createDocumentFragment();

  var showCard = function (oneCard) {
    fragment.appendChild(renderCard(oneCard));
  };

  var closeCard = function (oneCard) {
    fragment.removeChild(renderCard(oneCard));
  };


  window.card = {
    element: card,
    closeElement: closeCard,
    render: renderCard,
    showElement: showCard
  };

})();
