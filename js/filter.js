'use strict';

(function () {
  var TIMEOUT = 500;
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var activeFilterButton = document.querySelector('.img-filters__button--active');

  var sort = function (array, sortName) {
    switch (sortName) {
      case 'new':
        array = array.sort(function () {
          return window.util.getRandomInteger(0, 100) - window.util.getRandomInteger(0, 100);
        }).slice(0, 10);
        break;
      case 'discussed':
        array.sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
        break;
    }

    return array;
  };

  var lastTimeout;
  var debounce = function (action, last) {
    window.clearTimeout(last);
    last = window.setTimeout(action, TIMEOUT);
  };

  imgFiltersForm.addEventListener('click', function (evt) {
    var target = evt.target;

    if ((target.tagName === 'BUTTON') && (!target.classList.contains('img-filters__button--active'))) {
      activeFilterButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');

      var filterId = target.id;
      var sortedPhotos;

      switch (filterId) {
        case 'filter-new':
          sortedPhotos = sort(window.gallery.photos.slice(), 'new');
          debounce(window.gallery.updatePhotos(sortedPhotos), lastTimeout);
          break;
        case 'filter-discussed':
          sortedPhotos = sort(window.gallery.photos.slice(), 'discussed');
          debounce(window.gallery.updatePhotos(sortedPhotos), lastTimeout);
          break;
        default:
          debounce(window.gallery.updatePhotos(window.gallery.photos.slice()), lastTimeout);
          break;
      }

      activeFilterButton = target;
    }
  });

  var imgFilters = document.querySelector('.img-filters');

  window.filter = {
    showImgFilters: function () {
      imgFilters.classList.remove('img-filters--inactive');
    }
  };
})();
