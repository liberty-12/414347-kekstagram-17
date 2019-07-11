'use strict';

// RENDERING PICTURES

(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document
    .querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (photo) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;

    return pictureElement;
  };

  window.render = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPicture(array[i]));
    }

    pictures.appendChild(fragment);
  };
})();
