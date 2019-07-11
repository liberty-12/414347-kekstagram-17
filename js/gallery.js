'use strict';

// RENDERING PICTURES

(function () {
  var pictures = document.querySelector('.pictures');
  var pictureTemplate = document
    .querySelector('#picture')
    .content
    .querySelector('.picture');

  var successHandler = function (data) {
    var photos = data;
    var renderPicture = function (photo) {
      var pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = photo.url;
      pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
      pictureElement.querySelector('.picture__likes').textContent = photo.likes;

      return pictureElement;
    };

    var renderPhotosFragment = function (array) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderPicture(array[i]));
      }

      pictures.appendChild(fragment);
    };

    renderPhotosFragment(photos);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.zIndex = '100';
    node.style.width = '500px';
    node.style.margin = '0 auto';
    node.style.padding = '20px';
    node.style.backgroundColor = 'red';
    node.style.fontSize = '18px';
    node.style.lineHeight = '22px';
    node.style.textAlign = 'center';
    node.style.color = '#ffffff';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load.load(successHandler, errorHandler);
})();
