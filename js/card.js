'use strict';

(function () {
  var card = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCard = function (oneCard) {
    var cardElement = card.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = oneCard.author.avatar;
    cardElement.querySelector('.popup__title').textContent = oneCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = oneCard.offer.address;

    cardElement.querySelector('.popup__text--price').textContent = oneCard.offer.price;

    var offerTypetoPopupType = {
      'bungalo': 'Бунгало',
      'flat': 'Квартира',
      'house': 'Дом',
      'palace': 'Дворец',
    };
    cardElement.querySelector('.popup__type').textContent = offerTypetoPopupType[oneCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = oneCard.offer.rooms + ' комнаты для ' + oneCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + oneCard.offer.checkin + ', выезд до ' + oneCard.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = oneCard.offer.description;

    var photoList = oneCard.offer.photos;
    if (photoList.length === 0) {
      cardElement.removeChild(cardElement.querySelector('.popup__photos'));
    } else {
      cardElement.querySelector('.popup__photo').src = photoList[0];;
      for (var q = 1; q < photoList.length; q++) {
        var placePhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
        placePhoto.src = photoList[q];
        cardElement.querySelector('.popup__photos').appendChild(placePhoto);
      };
    };



    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      cardElement.parentNode.removeChild(cardElement);
    });

    return cardElement;
  };

  var pinList = document.querySelector('.map__pins');


  var showCard = function (cardElement) {
    pinList.appendChild(renderCard(cardElement));
  };

  var closeCard = function () {
    var cardElemList = document.querySelectorAll('.map__card');
    for (var j = 0; j < cardElemList.length; j++) {
      cardElemList[j].parentNode.removeChild(cardElemList[j]);
    }
  };


  window.card = {
    element: card,
    closeElement: closeCard,
    render: renderCard,
    pinList: pinList,
    showElement: showCard
  };

})();
