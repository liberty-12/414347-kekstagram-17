'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  // var bigPictureSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
  // var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');

  var onPopupEscKeydown = function (evt) {
    if (evt.keyCode === window.util.escCode) {
      closePopup();
    }
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  var renderCommentTemplate = function (comment) {
    var elementLi = document.createElement('li');
    var elementImg = document.createElement('img');
    var elementP = document.createElement('p');

    elementImg.classList.add('social__picture');
    elementImg.alt = '' + comment.name;
    elementImg.src = '' + comment.avatar;

    elementP.classList.add('social__text');
    elementP.textContent = '' + comment.message;

    elementLi.classList.add('social__comment');
    elementLi.appendChild(elementImg);
    elementLi.appendChild(elementP);

    return elementLi;
  };

  var generateBigPicture = function (element) {
    bigPictureImg.querySelector('img').src = element.url;
    bigPictureLikesCount.textContent = element.likes;
    bigPictureCommentsCount.textContent = element.comments.length;
    bigPictureSocialCaption.textContent = element.description;
  };
  //
  // function insertComments(element) {
  //   var fragment = document.createDocumentFragment();
  //   element.comments.forEach(function (item) {
  //     fragment.appendChild(renderCommentTemplate(item));
  //   });
  //
  //   bigPictureSocialComments.appendChild(fragment);
  // }

  var insertComments = function (element) {
    var COMMENTS_COUNT = 5;
    var i;
    var commentsFragment = document.createDocumentFragment();
    for (i = 0; i < COMMENTS_COUNT; i++) {
      commentsFragment.appendChild(renderCommentTemplate(element.comments[i]));
    }
    bigPictureSocialComments.appendChild(commentsFragment);
  };

  var showBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscKeydown);
    bigPictureSocialComments.innerHTML = '';
    generateBigPicture(photo);
    insertComments(photo);
  };

  // bigPictureSocialCommentsCount.classList.add('visually-hidden');
  // bigPictureCommentsLoader.classList.add('visually-hidden');

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
