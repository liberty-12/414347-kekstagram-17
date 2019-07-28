'use strict';

(function () {
  // SCALE
  var SCALE_VALUE_MAX = 100;
  var SCALE_VALUE_MIN = 25;
  var SCALE_VALUE_STEP = 25;

  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var scaleValue = document.querySelector('.scale__control--value');
  var uploadPreview = document.querySelector('.img-upload__preview');

  var onIncreaseValueClick = function () {
    var intScaleValue = parseInt(scaleValue.value, 10);

    if (scaleValue.value < SCALE_VALUE_MAX) {
      intScaleValue += SCALE_VALUE_STEP;
      scaleValue.value = intScaleValue;
    }

    transformUploadPreview(scaleValue.value);
  };

  var onDecreaseValueClick = function () {
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

  scaleBigger.addEventListener('click', onIncreaseValueClick);
  scaleSmaller.addEventListener('click', onDecreaseValueClick);

  // EFFECTS
  var EFFECT_LEVEL_LINE_WIDTH = 495 - 20 - 20;
  var EFFECT_LEVEL_PIN_WIDTH = 18;
  var EFFECT_LEVEL_MAX = 1;

  var effectsList = document.querySelector('.effects__list');
  var effectLevelSlider = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectInputNone = document.querySelector('#effect-none');
  var currentEffect = '';

  effectLevelSlider.classList.add('hidden');

  var setDefaultEffects = function () {
    effectInputNone.checked = 'true';
    uploadPreview.classList.add('effects__preview--none');
    effectLevelSlider.classList.add('hidden');
    uploadPreview.style.filter = 'none';
    uploadPreview.style.transform = 'scale(1)';
    scaleValue.value = '' + SCALE_VALUE_MAX;
  };

  var addEffectToUploadPreview = function (effect) {
    uploadPreview.classList.remove('effects__preview--' + currentEffect);
    uploadPreview.classList.add('effects__preview--' + effect);
    effectLevelSlider.classList.remove('hidden');

    currentEffect = effect;
  };

  var movePinToDefault = function () {
    findEffectLevelValue();

    effectLevelPin.style.left = (effectLevelLineRight - effectLevelLineLeft - EFFECT_LEVEL_PIN_WIDTH / 2) + 'px';
    effectLevelDepth.style.width = (effectLevelLineRight - effectLevelLineLeft) + 'px';
  };

  effectsList.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.tagName === 'INPUT') {
      var targetEffect = target.value;
      addEffectToUploadPreview(targetEffect);
      adjustEffect(EFFECT_LEVEL_MAX, currentEffect);
      movePinToDefault();
    }
  });

  var effectLevelLineLeft;
  var effectLevelLineRight;

  // EFFECT LEVEL
  var findEffectLevelValue = function () {
    var effectLevelPinLeft = effectLevelPin.offsetLeft;
    var effectLevelPinCenter = effectLevelPinLeft + (EFFECT_LEVEL_PIN_WIDTH / 2);
    var level = (effectLevelPinCenter / (effectLevelLineRight - effectLevelLineLeft)).toFixed(2);

    effectLevelLineLeft = effectLevelLine.getBoundingClientRect().left;
    effectLevelLineRight = effectLevelLineLeft + EFFECT_LEVEL_LINE_WIDTH;
    effectLevelValue.value = level;

    return level;
  };

  var changeEffectLevel = function () {
    adjustEffect(findEffectLevelValue(), currentEffect);
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

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    effectLevelLineLeft = effectLevelLine.getBoundingClientRect().left;
    effectLevelLineRight = effectLevelLineLeft + EFFECT_LEVEL_LINE_WIDTH;

    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var moveX = moveEvt.clientX;
      var shiftX = startCoordX - moveX;

      if (moveX > (effectLevelLineRight - EFFECT_LEVEL_PIN_WIDTH / 2)) {
        shiftX = startCoordX - effectLevelLineRight;
        startCoordX = effectLevelLineRight;
      } else if (moveX < effectLevelLineLeft) {
        shiftX = startCoordX - effectLevelLineLeft;
        startCoordX = effectLevelLineLeft;
      } else {
        startCoordX = moveX;
      }

      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shiftX) + 'px';
      effectLevelDepth.style.width = (startCoordX - effectLevelLineLeft) + 'px';

      adjustEffect(findEffectLevelValue(), currentEffect);
    };

    var onMouseUp = function () {
      changeEffectLevel();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.form = {
    setDefaultEffects: setDefaultEffects
  };
})();
