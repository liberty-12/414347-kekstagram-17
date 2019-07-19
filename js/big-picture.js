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

  function onPopupEscKeydown(evt) {
    if (evt.keyCode === window.util.escCode) {
      closePopup();
    }
  }

  function closePopup() {
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  function renderCommentTemplate(comment) {
    var elementLi = document.createElement('li');
    var elementImg = document.createElement('img');
    var elementP = document.createElement('p');

    elementImg.classList.add('social__picture');
    elementImg.alt = 'Изображение аватараы';
    elementImg.src = '' + comment.avatar;

    elementP.classList.add('social__text');
    elementP.textContent = '' + comment.message;

    elementLi.classList.add('social__comment');
    elementLi.appendChild(elementImg);
    elementLi.appendChild(elementP);

    return elementLi;
  }

  function generateBigPicture(element) {
    bigPictureImg.querySelector('img').src = element.url;
    bigPictureLikesCount.textContent = element.likes;
    bigPictureCommentsCount.textContent = element.comments.length;
    bigPictureSocialCaption.textContent = element.description;
  }
  //
  // function insertComments(element) {
  //   var fragment = document.createDocumentFragment();
  //   element.comments.forEach(function (item) {
  //     fragment.appendChild(renderCommentTemplate(item));
  //   });
  //
  //   bigPictureSocialComments.appendChild(fragment);
  // }

  function insertComments(element) {
    var i;
    for (i = 0; i < 5; i++) {
      bigPictureSocialComments.appendChild(renderCommentTemplate(element.comments[i]));
    }

    // bigPictureCommentsLoader.addEventListener('click', function () {
    //   for (var j = i; j < (i + 5); j++) {
    //     bigPictureSocialComments.appendChild(renderCommentTemplate(element.comments[j]));
    //   }
    //   i = j;
    // });
  }

  function showBigPicture(photo) {
    bigPicture.classList.remove('hidden');
    bigPictureCancel.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscKeydown);
    bigPictureSocialComments.innerHTML = '';
    generateBigPicture(photo);
    insertComments(photo);
  }

  // bigPictureSocialCommentsCount.classList.add('visually-hidden');
  // bigPictureCommentsLoader.classList.add('visually-hidden');

  window.bigPicture = {
    showBigPicture: showBigPicture
  };
})();
