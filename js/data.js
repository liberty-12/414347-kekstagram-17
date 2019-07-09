'use strict';

// Creating 25 photo descriptions

(function () {
  // var PHOTOS_NUMBER = 25;
  // var COMMENTS = ['Всё отлично!',
  //   'В целом всё неплохо. Но не всё.',
  //   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  // ];
  //
  // var createPhotos = function (commentArray) {
  //   var photosArray = [];
  //   var photoNumbers = window.util.getMixedArray(PHOTOS_NUMBER);
  //
  //   for (var i = 0; i < PHOTOS_NUMBER; i++) {
  //     var photo = {
  //       url: 'photos/' + photoNumbers[i] + '.jpg',
  //       comments: window.util.getNewLengthArray(commentArray),
  //       likes: window.util.getRandomInteger(15, 200)
  //     };
  //
  //     photosArray.push(photo);
  //   }
  //
  //   return photosArray;
  // };
  //
  // window.data = {
  //   photos: createPhotos(COMMENTS)
  // };

  var successHandler = function (data) {
    var photos = data;
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
