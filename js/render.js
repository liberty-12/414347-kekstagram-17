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

  window.render = {
    render: function (array) {
      document.querySelectorAll('.picture').forEach(function (item) {
        item.remove();
      });

      var fragment = document.createDocumentFragment();

      array.forEach(function (item) {
        fragment.appendChild(renderPicture(item));
      });

      pictures.appendChild(fragment);
    }
  };
})();
