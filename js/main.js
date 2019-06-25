'use strict';

// Creating 25 photo descriptions

var PHOTOS_NUMBER = 25;
var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomElementFromArray = function (arr) {
  return arr[Math.floor((Math.random() * arr.length))];
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getNewLengthArray = function (arr) {
  var newArray = [];
  var newArrayLength = getRandomInteger(1, arr.length);

  for (var i = 0; i < newArrayLength; i++) {
    newArray.push(getRandomElementFromArray(arr));
  }

  return newArray;
};

var getMixedArray = function (elementsLength) {
  var elementsArray = [];
  var element = getRandomInteger(1, elementsLength);

  while (elementsArray.length < elementsLength) {
    if (elementsArray.indexOf(element) > -1) {
      element = getRandomInteger(1, elementsLength);
    } else {
      elementsArray.push(element);
    }
  }

  return elementsArray;
};

var createPhotos = function (commentArray) {
  var photosArray = [];
  var photoNumbers = getMixedArray(PHOTOS_NUMBER);

  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    var photo = {
      url: 'photos/' + photoNumbers[i] + '.jpg',
      comments: getNewLengthArray(commentArray),
      likes: getRandomInteger(15, 200)
    };

    photosArray.push(photo);
  }

  return photosArray;
};

var photos = createPhotos(COMMENTS);

// Rendering pictures
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

// show img-upload__overlay
var ESC_KEYCODE = 27;

var uploadFileField = document.querySelector('#upload-file');
var uploadPopup = document.querySelector('.img-upload__overlay');
var uploadClose = document.querySelector('#upload-cancel');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadPopup();
  }
};

var openUploadPopup = function () {
  uploadPopup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeUploadPopup = function () {
  uploadPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  uploadFileField.value = '';
};

uploadFileField.addEventListener('change', function () {
  openUploadPopup();
});

uploadClose.addEventListener('click', function () {
  closeUploadPopup();
});
