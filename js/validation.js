'use strict';

// hashtag validation

(function () {
  var hashtagField = document.querySelector('.text__hashtags');
  var HASHTAG_MAX_NUMBER = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var hashtags = [];

  window.validation = {
    validateHashtagField: function () {
      if (hashtagField.value[hashtagField.value.length - 1] === ' ') {
        hashtags = hashtagField.value.slice(0, hashtagField.value.length - 1).split(' ');
      } else {
        hashtags = hashtagField.value.split(' ');
      }

      for (var i = 0; i < hashtags.length; i++) {
        if (hashtags.length > HASHTAG_MAX_NUMBER) {
          hashtagField.setCustomValidity('Не более ' + HASHTAG_MAX_NUMBER + ' тегов');
          hashtagField.style.border = '3px solid red';
        } else if (hashtags[i][0] !== '#') {
          hashtagField.style.border = '3px solid red';
          hashtagField.setCustomValidity('Хэш-тег должен начинаться с символа `#` (решётка)');
        } else if ((hashtags[i][0] === '#') && (hashtags[i].length === 1)) {
          hashtagField.style.border = '3px solid red';
          hashtagField.setCustomValidity('Хэш-тег не может состоять из одной `#` (решётки)');
        } else if (hashtags[i].slice(1).indexOf('#') > -1) {
          hashtagField.style.border = '3px solid red';
          hashtagField.setCustomValidity('Хэш-теги нужно разделять пробелами');
        } else if (hashtags[i].length > HASHTAG_MAX_LENGTH) {
          hashtagField.style.border = '3px solid red';
          hashtagField.setCustomValidity('Длина хэш-тега должна быть не более ' + HASHTAG_MAX_LENGTH + ' символов');
        } else {
          if (window.util.checkSameElements(hashtags)) {
            hashtagField.style.border = '3px solid red';
            hashtagField.setCustomValidity('Теги не должны повторяться');
          } else {
            hashtagField.style.border = '';
            hashtagField.setCustomValidity('');
          }
        }
      }

      if ((hashtags[0] === '') && (hashtags.length === 1)) {
        hashtagField.style.border = '';
        hashtagField.setCustomValidity('');
      }
    }
  };
})();
