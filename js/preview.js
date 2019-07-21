'use strict';

// show img-upload__overlay

(function () {
  // var uploadPreview = document.querySelector('.img-upload__preview');
  var uploadFileField = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadHashtag = document.querySelector('.text__hashtags');
  var uploadComment = document.querySelector('.text__description');
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
    window.form.setDefaultEffects();
    uploadHashtag.value = '';
    uploadComment.value = '';
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
  var successCloseButton = successMessage.querySelector('.success__button');

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

    successCloseButton.addEventListener('click', function () {
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
  var errorCloseButton = errorMessage.querySelector('.error__buttons');

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

    errorCloseButton.addEventListener('click', function () {
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
