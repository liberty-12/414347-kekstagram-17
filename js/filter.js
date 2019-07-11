'use strict';

(function () {
  var imgFilters = document.querySelector('.img-filters');
  setTimeout(function () {
    imgFilters.classList.remove('img-filters--inactive');
  }, 500);

  var imgFiltersForm = document.querySelector('.img-filters__form');
  var activeFilterButton = document.querySelector('.img-filters__button--active');

  // var Filter = {
  //   'popular': 'popular',
  //   'new': 'new',
  //   'discussed': 'discussed'
  // };

  imgFiltersForm.addEventListener('click', function (evt) {
    var target = evt.target;
    if ((target.tagName === 'BUTTON') && (!target.classList.contains('img-filters__button--active'))) {
      activeFilterButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');

      activeFilterButton = target;
    }
  });
})();
