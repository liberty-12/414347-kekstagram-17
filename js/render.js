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

    // pictureElement.appendChild(renderBigPicture(photo));

    return pictureElement;
  };

  // var bigPicture = document.querySelector('.big-picture');
  //
  // var bigPictureCommentList = bigPicture.querySelector('.social__comments');
  // var bigPictureComment = bigPicture.querySelector('.social__comment');
  //
  // var renderBigPicture = function (photo) {
  //   var bigPictureElement = bigPicture.cloneNode(true);
  //
  //   bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  //   bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  //   bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
  //   bigPictureElement.querySelector('.social__caption').textContent = '' + photo.description;
  //
  //
  //   var bigPictureCommentElement = bigPictureComment.cloneNode(true);
  //   var bigPictureCommentListElement = bigPictureCommentList.cloneNode(true);
  //
  //   bigPictureCommentListElement.querySelectorAll('.social__comment').forEach(function (item) {
  //     item.remove();
  //   });
  //
  //   for (var i = 0; i < photo.comments.length; i++) {
  //     bigPictureCommentElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomInteger(1, 6) + '.svg';
  //     bigPictureCommentElement.querySelector('.social__text').textContent = photo.comments[i].message;
  //
  //     bigPictureCommentListElement.appendChild(bigPictureCommentElement);
  //
  //   }
  //
  //
  //   bigPictureElement.appendChild(bigPictureCommentListElement);
  //
  //   return (bigPictureElement);
  // };

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
        pictureFragment.appendChild(renderPicture(item));
      });

      pictures.appendChild(pictureFragment);
    }
  };
})();
