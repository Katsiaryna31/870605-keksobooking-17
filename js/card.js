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

    var icons = cardElement.querySelectorAll('.popup__feature');
    for (var q = 0; q < icons.length; q++) {
     var feature = icons[q].classList[1].split('--')[1];
     if (oneCard.offer.features.indexOf(feature) === -1) {
       cardElement.querySelector('.popup__features').removeChild(icons[q]);
     }
     console.log(feature);
   }

    var photoList = oneCard.offer.photos;
    if (photoList.length === 0) {
      cardElement.removeChild(cardElement.querySelector('.popup__photos'));
    } else {
      cardElement.querySelector('.popup__photo').src = photoList[0];
      for (var q = 1; q < photoList.length; q++) {
        var placePhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
        placePhoto.src = photoList[q];
        cardElement.querySelector('.popup__photos').appendChild(placePhoto);
      }
    }

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      cardElement.parentNode.removeChild(cardElement);
    });

    return cardElement;
  };

  var pinList = document.querySelector('.map__pins');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeCard();
    }
  };

  var showCard = function (cardElement) {
    pinList.appendChild(renderCard(cardElement));
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeCard = function () {
    var cardElemList = document.querySelectorAll('.map__card');
    for (var j = 0; j < cardElemList.length; j++) {
      cardElemList[j].parentNode.removeChild(cardElemList[j]);
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.card = {
    element: card,
    closeElement: closeCard,
    render: renderCard,
    pinList: pinList,
    showElement: showCard
  };

})();
