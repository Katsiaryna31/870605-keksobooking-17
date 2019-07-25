'use strict';

(function () {

  var errorMessage = document.querySelector('#error')
    .content
    .querySelector('.error');


  var sendErrorText = function () {
    document.querySelector('body').insertAdjacentElement('afterbegin', errorMessage);
  };

  errorMessage.querySelector('.error__button').addEventListener('click', function () {
    window.location.reload();
  });

  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');

  var sendSuccessText = function () {
    document.querySelector('body').insertAdjacentElement('afterbegin', successMessage);
  };

  window.notice = {
    showError: sendErrorText,
    showSuccess: sendSuccessText,
    errorMessage: errorMessage,
    successMessage: successMessage
  };
})();
