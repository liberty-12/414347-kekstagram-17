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

    checkSameElements: function (array) {
      var newArray = [];
      var hasSameElement = false;

      for (var i = 0; i < array.length; i++) {
        if (newArray.indexOf(array[i].toLowerCase()) === -1) {
          newArray.push(array[i]);
        } else {
          hasSameElement = true;
          break;
        }
      }

      return hasSameElement;
    }
  };
})();
