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

  var createPhotos = function (commentArray) {
    var photosArray = [];
    var photoNumbers = window.util.getMixedArray(PHOTOS_NUMBER);

    for (var i = 0; i < PHOTOS_NUMBER; i++) {
      var photo = {
        url: 'photos/' + photoNumbers[i] + '.jpg',
        comments: window.util.getNewLengthArray(commentArray),
        likes: window.util.getRandomInteger(15, 200)
      };

      photosArray.push(photo);
    }

    return photosArray;
  };

  window.data = {
    photos: createPhotos(COMMENTS)
  };
})();
