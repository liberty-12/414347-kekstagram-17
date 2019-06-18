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

  return mixedArray;
};

var createPhotoDescription = function (commentArray) {
  var photoDescriptions = [];

  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    var photoDescription = {
      url: 'photos/' + getRandomInteger(1, 25) + '.jpg',
      comment: getMixedArray(commentArray).slice(0, getRandomInteger(1, commentArray.length)),
      likes: getRandomInteger(15, 200)
    };

    photoDescriptions.push(photoDescription);
  }

  return photoDescriptions;
};

var descriptions = createPhotoDescription(COMMENTS);

// Rendering pictures
var pictures = document.querySelector('.pictures');
var pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPicture = function (description) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = description.url;
  pictureElement.querySelector('.picture__comments').textContent = description.comment.length;
  pictureElement.querySelector('.picture__likes').textContent = description.likes;

  return pictureElement;
};

var addFragment = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPicture(array[i]));
  }

  return fragment;
};

pictures.appendChild(addFragment(descriptions));
