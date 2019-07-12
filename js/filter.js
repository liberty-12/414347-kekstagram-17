'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');
  setTimeout(function () {
    imgFilters.classList.remove('img-filters--inactive');
  }, 500);

  var imgFiltersForm = document.querySelector('.img-filters__form');
  var activeFilterButton = document.querySelector('.img-filters__button--active');

  window.filter = {
    sortNew: function (array) {
      var n = array.comments.length;
      for (var i = 0; i < n - 1; i++) {
        var max = i;
        for (var j = i + 1; j < n; j++) {
          if (array[j] > array[max]) {
            max = j;
          }
        }
        var t = array[max];
        array[max] = array[i];
        array[i] = t;
      }
      return array;

      // return window.util.getRandomInteger(0, 100) - window.util.getRandomInteger(0, 100);
    },

    sortDiscussed: function (left, right) {
      return right.comments.length - left.comments.length;
    }
  };

  var sortPopular = function () {
    window.gallery.updatePhotos();
  };


  var sortDiscussed = function () {
    window.gallery.updatePhotos().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
  };

  var lastTimeout;
  var debounce = function (action, last) {
    window.clearTimeout(last);
    last = window.setTimeout(action, 500);
  };

  imgFiltersForm.addEventListener('click', function (evt) {
    var target = evt.target;
    if ((target.tagName === 'BUTTON') && (!target.classList.contains('img-filters__button--active'))) {
      activeFilterButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');

      var filterId = target.id;

      switch (filterId) {
        case 'filter-new':
          debounce(sortNew, lastTimeout);
          break;
        case 'filter-discussed':
          debounce(sortDiscussed, lastTimeout);
          break;
        default:
          debounce(sortPopular, lastTimeout);
          break;
      }

      activeFilterButton = target;
    }
  });
})();
