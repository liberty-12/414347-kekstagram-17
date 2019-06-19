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

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getMixedArray = function (arr) {
  var mixedArray = arr.slice();

  for (var i = mixedArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = mixedArray[i];
    mixedArray[i] = mixedArray[j];
    mixedArray[j] = temp;
  }

  var newArray = [];
  var newArrayLength = getRandomInteger(1, arr.length);

  for (i = 0; i < newArrayLength; i++) {
    newArray.push(mixedArray[i]);
  }

  return newArray;
};

var checkRepeats = function (elementsArray, element) {
  var flag = false;

  while ((flag === true) || (elementsArray.length < PHOTOS_NUMBER)) {
    if (elementsArray.indexOf(element) >= 0) {
      flag = true;
    }

    if (flag === false) {
      elementsArray.push(element);
    }

    flag = false;
    element = getRandomInteger(1, 25);
  }

  return elementsArray;
};

var createPhotos = function (commentArray) {
  var photoDescriptions = [];
  var photoNumbers = [];
  var photoNumber = getRandomInteger(1, 25);

  photoNumbers = checkRepeats(photoNumbers, photoNumber);

  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    var photoDescription = {
      url: 'photos/' + photoNumbers[i] + '.jpg',
      comments: getMixedArray(commentArray),
      likes: getRandomInteger(15, 200)
    };

    photoDescriptions.push(photoDescription);
  }

  return photoDescriptions;
};

var descriptions = createPhotos(COMMENTS);

// Rendering pictures
var pictures = document.querySelector('.pictures');
var pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPicture = function (description) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = description.url;
  pictureElement.querySelector('.picture__comments').textContent = description.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = description.likes;

  return pictureElement;
};

var addPhotoFragmentToDOM = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPicture(array[i]));
  }

  return fragment;
};

pictures.appendChild(addPhotoFragmentToDOM(descriptions));
