'use strict';

// show img-upload__overlay

(function () {
  var ESC_KEYCODE = 27;

  var uploadPreview = document.querySelector('.img-upload__preview');
  var uploadFileField = document.querySelector('#upload-file');
  var uploadPopup = document.querySelector('.img-upload__overlay');
  var uploadClose = document.querySelector('#upload-cancel');

  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && (evt.target.tagName !== 'TEXTAREA')) {
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
})();
