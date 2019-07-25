'use strict';

// show img-upload__overlay

(function () {
  var uploadFileField = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadHashtag = document.querySelector('.text__hashtags');
  var uploadComment = document.querySelector('.text__description');
  var mainField = document.querySelector('main');
  var hashtagField = document.querySelector('.text__hashtags');

  var onPopupEscPress = function (evt) {
    var className = evt.target.className.split(' ')[0];
    if (((evt.target.tagName !== 'TEXTAREA') && (evt.target.tagName !== 'INPUT')) || (className === 'effects__radio')) {
      window.util.escCodeEvent(evt, closeUploadPopup);
    }
  };

  var openUploadPopup = function () {
    uploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.form.setDefaultEffects();
    uploadHashtag.value = '';
    uploadComment.value = '';
    hashtagField.addEventListener('input', window.validation.onHashtagFieldInput);
  };

  var closeUploadPopup = function () {
    uploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    hashtagField.removeEventListener('input', window.validation.onHashtagFieldInput);
    uploadFileField.value = '';
  };

  uploadFileField.addEventListener('change', function () {
    openUploadPopup();
  });

  uploadClose.addEventListener('click', function () {
    closeUploadPopup();
  });

  // ------------------------------------------------ //
  // SUCCESS
  var successMessageTemplate = document
    .querySelector('#success')
    .content
    .querySelector('.success');
  var successMessage = successMessageTemplate.cloneNode(true);
  var successCloseButton = successMessage.querySelector('.success__button');

  var onCloseSuccessPopupClick = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onSuccessPopupEscPress);
    document.removeEventListener('click', onCloseSuccessPopupClick);
  };

  var onSuccessPopupEscPress = function (evt) {
    window.util.escCodeEvent(evt, onCloseSuccessPopupClick);
  };

  var successHandler = function () {
    closeUploadPopup();

    document.addEventListener('keydown', onSuccessPopupEscPress);
    document.addEventListener('click', onCloseSuccessPopupClick);
    successCloseButton.addEventListener('click', onCloseSuccessPopupClick);

    mainField.appendChild(successMessage);
  };

  // ERROR
  var errorMessageTemplate = document
    .querySelector('#error')
    .content
    .querySelector('.error');

  var errorMessage = errorMessageTemplate.cloneNode(true);
  var errorCloseButton = errorMessage.querySelector('.error__buttons');

  var onCloseErrorPopupClick = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', onErrorPopupEscPress);
    document.removeEventListener('click', onCloseErrorPopupClick);
  };

  var onErrorPopupEscPress = function (evt) {
    window.util.escCodeEvent(evt, onCloseErrorPopupClick);
  };

  var errorHandler = function () {
    closeUploadPopup();

    document.addEventListener('keydown', onErrorPopupEscPress);
    document.addEventListener('click', onCloseErrorPopupClick);
    errorCloseButton.addEventListener('click', onCloseErrorPopupClick);

    mainField.appendChild(errorMessage);
  };


  // EVENT
  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.send.send(new FormData(uploadForm), successHandler, errorHandler);
  });

})();
