'use strict';

// show img-upload__overlay

(function () {
  var uploadPreview = document.querySelector('.img-upload__preview');
  var uploadFileField = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('#upload-cancel');

  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === window.util.escCode) && (evt.target.tagName !== 'TEXTAREA')) {
      closeUploadPopup();
    }
  };

  var openUploadPopup = function () {
    uploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    uploadPreview.style.transform = 'scale(1)';
  };

  var closeUploadPopup = function () {
    uploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFileField.value = '';
  };

  uploadFileField.addEventListener('change', function () {
    openUploadPopup();
  });

  uploadClose.addEventListener('click', function () {
    closeUploadPopup();
  });

  var submitButton = document.querySelector('.img-upload__submit');
  var mainField = document.querySelector('main');

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.escCode) {
      closeMessagePopup();
    }
  };

  var onMessageClick = function () {
    closeMessagePopup();
  };

  var closeMessagePopup = function () {
    document.querySelector('.error').remove(); // как передать в функцию имя класса?
    document.removeEventListener('keydown', onMessageEscPress);
    document.removeEventListener('click', onMessageClick);
  };

  // SUCCESS
  var successMessageTemplate = document
    .querySelector('#success')
    .content
    .querySelector('.success');
  var successMessage = successMessageTemplate.cloneNode(true);
  var successCloseButoon = successMessage.querySelector('.success__button');

  var successHandler = function () {
    closeUploadPopup();
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onMessageClick);
    successCloseButoon.addEventListener('click', closeMessagePopup);
    mainField.appendChild(successMessage);
  };

  // ERROR
  var errorMessageTemplate = document
    .querySelector('#error')
    .content
    .querySelector('.error');

  var errorMessage = errorMessageTemplate.cloneNode(true);
  var errorCloseButoon = errorMessage.querySelector('.error__buttons');

  var errorHandler = function () {
    closeUploadPopup();
    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onMessageClick);
    errorCloseButoon.addEventListener('click', closeMessagePopup);
    mainField.appendChild(errorMessage);
  };


  // EVENT
  submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    window.send.send(successHandler, errorHandler);
  });
})();
