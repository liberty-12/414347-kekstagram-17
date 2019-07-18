'use strict';

// show img-upload__overlay

(function () {
  var uploadPreview = document.querySelector('.img-upload__preview');
  var uploadFileField = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var submitButton = document.querySelector('.img-upload__submit');
  var mainField = document.querySelector('main');

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

  // ------------------------------------------------ //
  var closeMessagePopup = function (className) {
    document.querySelector(className).remove();
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

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.escCode) {
        closeMessagePopup('.success');
      }
    });

    document.addEventListener('click', function () {
      closeMessagePopup('.success');
    });

    successCloseButoon.addEventListener('click', function () {
      closeMessagePopup('.success');
    });

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

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.escCode) {
        closeMessagePopup('.error');
      }
    });

    document.addEventListener('click', function () {
      closeMessagePopup('.error');
    });

    errorCloseButoon.addEventListener('click', function () {
      closeMessagePopup('.error');
    });

    mainField.appendChild(errorMessage);
  };


  // EVENT
  submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    window.send.send(new FormData(uploadForm), successHandler, errorHandler);
  });

})();
