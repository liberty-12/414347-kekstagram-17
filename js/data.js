'use strict';

// Creating 25 photo descriptions

(function () {
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

  window.data = {
    photos: createPhotos(COMMENTS)
  };
})();
