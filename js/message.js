'use strict';

(function () {

  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');


  var errorHandler = function () {
    document.querySelector('.map__pin').insertAdjacentElement('beforeend', errorMessage);
  };

  errorMessage.querySelector('.error__button').addEventListener('click', function () {
    window.location.reload();
  });

  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');

  var successHandler = function () {
    document.querySelector('.map__pin').insertAdjacentElement('beforeend', successMessage);
  };

  window.message = {
    error: errorHandler,
    success: successHandler,
    errorMessage: errorMessage,
    successMessage: successMessage
  };
})();
