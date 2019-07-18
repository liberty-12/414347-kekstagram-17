'use strict';

// hashtag validation

(function () {
  var hashtagField = document.querySelector('.text__hashtags');
  var hashtagMaxNumber = 5;
  var hashtagMaxLength = 20;
  var hashtags = [];

  hashtagField.addEventListener('input', function () {
    hashtags = hashtagField.value.split(' ');

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags.length > hashtagMaxNumber) {
        hashtagField.setCustomValidity('Не более ' + hashtagMaxNumber + ' тегов');
        hashtagField.style.border = '3px solid red';
      } else if (hashtags[i][0] !== '#') {
        hashtagField.style.border = '3px solid red';
        hashtagField.setCustomValidity('Хэш-тег должен начинаться с символа `#` (решётка)');
      } else if ((hashtags[i][0] === '#') && (hashtags[i].length === 1)) {
        hashtagField.style.border = '3px solid red';
        hashtagField.setCustomValidity('Хэш-тег не может состоять из одной `#` (решётки)');
      } else if (hashtags[i][hashtags[i].length - 1] === ',') {
        hashtagField.style.border = '3px solid red';
        hashtagField.setCustomValidity('Хэш-теги нужно разделять пробелами');
      } else if (hashtags[i].length > hashtagMaxLength) {
        hashtagField.style.border = '3px solid red';
        hashtagField.setCustomValidity('Длина хэш-тега должна быть не более ' + hashtagMaxLength + ' символов');
      } else {
        for (var j = 0; j < hashtags.length; j++) {
          if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase() && i !== j) {
            var doubleTag = hashtags[j];
          }
        } if (doubleTag !== undefined) {
          hashtagField.style.border = '3px solid red';
          hashtagField.setCustomValidity('Теги не должны повторяться');
        } else {
          hashtagField.style.border = '';
          hashtagField.setCustomValidity('');
        }
      }
    }
  });
})();
