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
  uploadPreview.style.transform = 'scale(1)';
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

// SCALE
var SCALE_VALUE_MAX = 100;
var SCALE_VALUE_MIN = 25;
var SCALE_VALUE_STEP = 25;

var scaleSmaller = document.querySelector('.scale__control--smaller');
var scaleBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');
var uploadPreview = document.querySelector('.img-upload__preview');

var increaseValue = function () {
  var intScaleValue = parseInt(scaleValue.value, 10);

  if (scaleValue.value < SCALE_VALUE_MAX) {
    intScaleValue += SCALE_VALUE_STEP;
    scaleValue.value = intScaleValue;
  }
  transformUploadPreview(scaleValue.value);
};

var decreaseValue = function () {
  if (scaleValue.value > SCALE_VALUE_MIN) {
    scaleValue.value -= SCALE_VALUE_STEP;
  }
  transformUploadPreview(scaleValue.value);
};

var transformUploadPreview = function (value) {
  if (value === '100') {
    uploadPreview.style.transform = 'scale(1)';
  } else {
    uploadPreview.style.transform = 'scale(0.' + value + ')';
  }
};

scaleBigger.addEventListener('click', function () {
  increaseValue();
});

scaleSmaller.addEventListener('click', function () {
  decreaseValue();
});

// EFFECTS
var EFFECT_LEVEL_LINE_WIDTH = 495 - 20 - 20;
var EFFECT_LEVEL_PIN_WIDTH = 18;
var EFFECT_LEVEL_MAX = 1;

var effectsList = document.querySelector('.effects__list');
var effectLevelSlider = document.querySelector('.img-upload__effect-level');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelLine = document.querySelector('.effect-level__line');
var currentEffect = '';

effectLevelSlider.classList.add('hidden');

var addEffectToUploadPreview = function (effect) {
  uploadPreview.classList.remove('effects__preview--' + currentEffect);
  uploadPreview.classList.add('effects__preview--' + effect);
  effectLevelSlider.classList.remove('hidden');

  currentEffect = effect;
};

effectsList.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.tagName === 'INPUT') {
    var targetEffect = target.value;
    addEffectToUploadPreview(targetEffect);
    adjustEffect(EFFECT_LEVEL_MAX, currentEffect);
  }
});

// EFFECT LEVEL
var changeEffectLevel = function () {
  var effectLevelPinLeft = effectLevelPin.offsetLeft;
  var effectLevelPinCenter = effectLevelPinLeft + (EFFECT_LEVEL_PIN_WIDTH / 2);
  var effectLevelLineLeft = effectLevelLine.getBoundingClientRect().left;
  var effectLevelLineRight = effectLevelLineLeft + EFFECT_LEVEL_LINE_WIDTH;

  var level = (effectLevelPinCenter / (effectLevelLineRight - effectLevelLineLeft)).toFixed(1);

  effectLevelValue.value = level;

  adjustEffect(level, currentEffect);
};

var adjustEffect = function (lvl, curEffect) {
  var MARVIN_LEVEL_MAX = 100;
  var PHOBOS_LEVEL_MAX = 3;
  var HEAT_LEVEL_MIN = 1;
  var HEAT_LEVEL_MAX = 3;

  switch (curEffect) {
    case 'chrome':
      uploadPreview.style.filter = 'grayscale(' + lvl + ')';
      break;
    case 'sepia':
      uploadPreview.style.filter = 'sepia(' + lvl + ')';
      break;
    case 'marvin':
      uploadPreview.style.filter = 'invert(' + (lvl * MARVIN_LEVEL_MAX) + '%)';
      break;
    case 'phobos':
      uploadPreview.style.filter = 'blur(' + (lvl * PHOBOS_LEVEL_MAX) + 'px)';
      break;
    case 'heat':
      uploadPreview.style.filter = 'brightness(' + (lvl * (HEAT_LEVEL_MAX - HEAT_LEVEL_MIN) + HEAT_LEVEL_MIN) + ')';
      break;
    default:
      uploadPreview.style.filter = 'none';
      effectLevelSlider.classList.add('hidden');
      break;
  }
};

effectLevelPin.addEventListener('click', function () {
  changeEffectLevel();
});
