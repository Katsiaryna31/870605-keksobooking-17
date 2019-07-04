'use strict';

(function () {
  var message = document.querySelector('#error')
    .content
    .querySelector('.error')


  var errorHandler = function () {
    document.querySelector('.map__pin').insertAdjacentElement('beforeend', message);
  };

  message.querySelector('.error__button').addEventListener('click', function () {
    window.location.reload();
  })

  window.message = {
    error: errorHandler,
    message: message
  };
})();
