'use strict';

// SHOW PICTURES

(function () {
  var successHandler = function (data) {
    window.gallery.photos = data;
    window.gallery.updatePhotos(window.gallery.photos);
    window.filter.showImgFilters();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.zIndex = '100';
    node.style.width = '500px';
    node.style.margin = '0 auto';
    node.style.padding = '20px';
    node.style.backgroundColor = 'red';
    node.style.fontSize = '18px';
    node.style.lineHeight = '22px';
    node.style.textAlign = 'center';
    node.style.color = '#ffffff';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.gallery = {
    photos: [],

    updatePhotos: function (array) {
      window.render.render(array);
    }
  };
})();
