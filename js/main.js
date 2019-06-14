var NUMBER = 9;

var getAvatar = function (k) {
  return k < NUMBER ? 'img/avatars/user' + '0' + k + '.png' : 'img/avatars/user' + k + '.png';
}

var kindPlace = ['palace', 'flat', 'house', 'bungalo'];

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAdvertising = function () {
  var advertisement = [];
  for (var i = 0; i < 8; i++) {
    var typeLive = Math.floor(Math.random() * kindPlace.length);
    var oneAdvert = {
      author: {
        avatar: getAvatar(i+1)
      },
      offer: {
        type: kindPlace[typeLive]
      },
      location: {
        x: getRandomValue(1, 1200) + 'px',
        y: getRandomValue(130, 630) + 'px'
      }
    };
    advertisement.push(oneAdvert);
  }
  return advertisement;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinList = document.querySelector('.map__pins');

var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var renderAdvert = function (oneAdvert) {
  var oneAdvertElement = pin.cloneNode(true);

  oneAdvertElement.querySelector('.map__pin');
  oneAdvertElement.style.left = oneAdvert.location.X;
  oneAdvertElement.style.top = oneAdvert.location.Y;
  oneAdvertElement.src = oneAdvert.author.avatar;
  oneAdvertElement.alt = oneAdvert.offer.type;

  return oneAdvertElement;
};

var fragment = document.createDocumentFragment();
var advertisments = getAdvertising(avatar, type);
for (var j = 0; j < advertisments.length; j++) {
  fragment.appendChild(renderAdvert(advertisments[j]));
}
pinList.appendChild(fragment);
