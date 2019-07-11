'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');
  setTimeout(function () {
    imgFilters.classList.remove('img-filters--inactive');
  }, 500);

  var imgFiltersForm = document.querySelector('.img-filters__form');
  var activeFilterButton = document.querySelector('.img-filters__button--active');

  var sortPopular = function () {
    window.gallery.updatePhotos();
  };

  var sortNew = function () {
    window.gallery.updatePhotos().sort(function () {
      return window.util.getRandomInteger(0, 100) - window.util.getRandomInteger(0, 100);
    });
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
