'use strict';

// Creating 25 photo descriptions

var PHOTOS_NUMBER = 25;
var COMMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getRandomElement = function (arr) {
  return arr[Math.floor((Math.random() * arr.length))];
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var createPhotoDescription = function (commentArray) {
  var photoDescriptions = [];

  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    var x = getRandomInteger(1, 25);
    var y = getRandomInteger(15, 200);

    var photoDescription = {
      'avatar': 'photos/' + x + '.jpg',
      'comment': getRandomElement(commentArray),
      'likes': y
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

  pictureElement.querySelector('.picture__img').src = description.avatar;
  pictureElement.querySelector('.picture__comments').textContent = description.comment;
  pictureElement.querySelector('.picture__likes').textContent = description.likes;

  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < descriptions.length; i++) {
  fragment.appendChild(renderPicture(descriptions[i]));
}

pictures.appendChild(fragment);
