'use strict';

(function () {
  var getRandomElementFromArray = function (arr) {
    return arr[Math.floor((Math.random() * arr.length))];
  };

  // 27
  var ESC_CODE = 27;

  window.util = {
    escCodeEvent: function (evt, callback) {
      if (evt.keyCode === ESC_CODE) {
        callback();
      }
    },

    getRandomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getNewLengthArray: function (arr) {
      var newArray = [];
      var newArrayLength = window.util.getRandomInteger(1, arr.length);

      for (var i = 0; i < newArrayLength; i++) {
        newArray.push(getRandomElementFromArray(arr));
      }

      return newArray;
    },

    getMixedArray: function (elementsLength) {
      var elementsArray = [];
      var element = window.util.getRandomInteger(1, elementsLength);

      while (elementsArray.length < elementsLength) {
        if (elementsArray.indexOf(element) > -1) {
          element = window.util.getRandomInteger(1, elementsLength);
        } else {
          elementsArray.push(element);
        }
      }

      return elementsArray;
    }
  };
})();
