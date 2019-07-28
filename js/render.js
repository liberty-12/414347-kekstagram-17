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

  var clearElements = function (className) {
    document.querySelectorAll(className).forEach(function (item) {
      item.remove();
    });
  };

  window.render = {
    render: function (array) {
      clearElements('.picture');

      var pictureFragment = document.createDocumentFragment();

      array.forEach(function (item) {
        var picture = renderPicture(item);

        picture.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.bigPicture.showBigPicture(item);
        });

        pictureFragment.appendChild(picture);
      });

      pictures.appendChild(pictureFragment);
    }
  };
})();
