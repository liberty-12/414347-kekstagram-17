'use strict';

(function () {
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

    checkSameElements: function (array, elem) {
      var isSame = false;
      if (array.indexOf(elem) > -1) {
        isSame = true;
      }

      return isSame;
    }
  };
})();
