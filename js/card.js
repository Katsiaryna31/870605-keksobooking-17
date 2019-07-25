'use strict';

(function () {
  var card = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var offerTypetoPopupType = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var renderCard = function (oneCard) {
    var cardElement = card.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = oneCard.author.avatar;
    cardElement.querySelector('.popup__title').textContent = oneCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = oneCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = oneCard.offer.price;

    cardElement.querySelector('.popup__type').textContent = offerTypetoPopupType[oneCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = oneCard.offer.rooms + ' комнаты для ' + oneCard.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + oneCard.offer.checkin + ', выезд до ' + oneCard.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = oneCard.offer.description;

    var icons = cardElement.querySelectorAll('.popup__feature');
    takeIconsList(icons, cardElement, oneCard);

    var photoList = oneCard.offer.photos;
    takePhotoList(photoList, cardElement);

    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      cardElement.parentNode.removeChild(cardElement);
      deactivatePin();
    });

    return cardElement;
  };

  var takeIconsList = function (icons, cardElement, oneCard) {
    icons.forEach(function (iconElement) {
      var feature = iconElement.classList[1].split('--')[1];
      if (oneCard.offer.features.indexOf(feature) === -1) {
        cardElement.querySelector('.popup__features').removeChild(iconElement);
      }
    });
  };

  var takePhotoList = function (photoList, cardElement) {
    if (photoList.length === 0) {
      cardElement.removeChild(cardElement.querySelector('.popup__photos'));
    } else {
      cardElement.querySelector('.popup__photo').src = photoList[0];
      for (var i = 1; i < photoList.length; i++) {
        var placePhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
        placePhoto.src = photoList[i];
        cardElement.querySelector('.popup__photos').appendChild(placePhoto);
      }
    }
  };

  var pinList = document.querySelector('.map__pins');

  var showCard = function (cardElement) {
    pinList.appendChild(renderCard(cardElement));
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.escKeycode) {
      closeCard();
      deactivatePin();
    }
  };

  var closeCard = function () {
    var cardElementsList = document.querySelectorAll('.map__card');
    cardElementsList.forEach(function (cardElement) {
      cardElement.parentNode.removeChild(cardElement);
    });
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var deactivatePin = function () {
    var activeElement = document.querySelector('.map__pins').querySelector('.map__pin--active');
    if (document.contains(activeElement)) {
      return activeElement.classList.remove('map__pin--active');
    }
    return activeElement;
  };

  window.card = {
    element: card,
    closeElement: closeCard,
    render: renderCard,
    pinList: pinList,
    showElement: showCard
  };

})();
