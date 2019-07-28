'use strict';

(function () {
  var MAX_COMMENT_COUNT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img');
  var bigPictureLikesCount = bigPicture.querySelector('.likes-count');
  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  var bigPictureCommentsCountText = bigPicture.querySelector('.social__comment-count');
  var bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
  var bigPictureSocialComments = bigPicture.querySelector('.social__comments');
  var bigPictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');

  var onPopupEscKeydown = function (evt) {
    window.util.escCodeEvent(evt, сlosePopup);
  };

  var сlosePopup = function () {
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', onClosePopupClick);
    document.removeEventListener('keydown', onPopupEscKeydown);
    body.classList.remove('modal-open');
  };

  var onClosePopupClick = function (evt) {
    evt.preventDefault();

    сlosePopup();
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

  var generateTextCommentCount = function (count) {
    bigPictureCommentsCountText.textContent = count + ' из ' + bigPictureCommentsCount.textContent + ' комментариев';
  };

  var generateBigPicture = function (element) {
    bigPictureImg.querySelector('img').src = element.url;
    bigPictureLikesCount.textContent = element.likes;
    bigPictureSocialCaption.textContent = element.description;
    bigPictureCommentsCount.textContent = element.comments.length;
  };

  var insertComments = function (commentArray) {
    var fragment = document.createDocumentFragment();

    commentArray.forEach(function (item) {
      fragment.appendChild(renderCommentTemplate(item));
    });

    bigPictureSocialComments.appendChild(fragment);
  };

  var showBigPicture = function (photo) {
    var comments = photo.comments.slice();
    var commentsToPublish = comments;
    var nextComments = comments;
    var nextCommentsToPublish = [];
    var textCommentCount = commentsToPublish.length;

    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', onClosePopupClick);
    document.addEventListener('keydown', onPopupEscKeydown);
    bigPictureSocialComments.innerHTML = '';
    bigPictureCommentsLoader.classList.add('hidden');
    body.classList.add('modal-open');

    generateBigPicture(photo);

    var onCommentsLoaderClick = function () {
      if (nextComments.length <= MAX_COMMENT_COUNT) {
        nextCommentsToPublish = nextComments;
        bigPictureCommentsLoader.classList.add('hidden');
        bigPictureCommentsLoader.removeEventListener('click', onCommentsLoaderClick);
      } else {
        nextCommentsToPublish = nextComments.slice(0, MAX_COMMENT_COUNT);
        nextComments = nextComments.slice(nextCommentsToPublish.length);
      }

      textCommentCount += nextCommentsToPublish.length;
      generateTextCommentCount(textCommentCount);

      insertComments(nextCommentsToPublish);
    };

    if (comments.length > MAX_COMMENT_COUNT) {
      commentsToPublish = comments.slice(0, MAX_COMMENT_COUNT);
      bigPictureCommentsLoader.classList.remove('hidden');
      textCommentCount = commentsToPublish.length;
      nextComments = comments.slice(commentsToPublish.length);
      bigPictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);
    }

    insertComments(commentsToPublish);
    generateTextCommentCount(textCommentCount);
  };

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
