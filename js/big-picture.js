'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var MAX_COMMENT_COUNT = 5;

  var onPopupEscKeydown = function (evt) {
    window.util.escCodeEvent(evt, closePopup);
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

  var insertComments = function (commentArray) {
    var fragment = document.createDocumentFragment();
    commentArray.forEach(function (item) {
      fragment.appendChild(renderCommentTemplate(item));
    });

    bigPictureSocialComments.appendChild(fragment);
  };

  var showBigPicture = function (photo) {
    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscKeydown);
    bigPictureSocialComments.innerHTML = '';
    bigPictureCommentsLoader.classList.add('hidden');
    generateBigPicture(photo);

    var comments = photo.comments.slice();
    var commentsToPublish = [];
    if (comments.length > 5) {
      commentsToPublish = comments.slice(0, MAX_COMMENT_COUNT);
      bigPictureCommentsLoader.classList.remove('hidden');
    } else {
      commentsToPublish = comments;
    }
    insertComments(commentsToPublish);

    var onCommentsLoaderClick = function () {
      comments = comments.slice(MAX_COMMENT_COUNT);
      commentsToPublish = comments.slice(0, MAX_COMMENT_COUNT);
      insertComments(commentsToPublish);
      if (commentsToPublish.length < MAX_COMMENT_COUNT) {
        bigPictureCommentsLoader.classList.add('hidden');
        bigPictureCommentsLoader.removeEventListener('click', onCommentsLoaderClick);
      }
    };

    bigPictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);
  };

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
