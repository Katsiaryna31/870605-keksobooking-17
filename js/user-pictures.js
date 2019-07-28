'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserPicture = document.querySelector('.ad-form__input');
  var previewPicture = document.querySelector('.ad-form__photo');
  var pictureContainer = document.querySelector('.ad-form__photo-container');

  fileChooserPicture.addEventListener('change', function () {
    var file = fileChooserPicture.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var picture = previewPicture.querySelector('img');
        if (!picture) {
          picture = document.createElement('img');
          previewPicture.appendChild(picture);
          addClickPicture(previewPicture);
        } else {
          var loadedImage = previewPicture.cloneNode(true);
          pictureContainer.appendChild(loadedImage);
          addClickPicture(loadedImage);
        }
        picture.classList.add('ad-form-header__preview');
        picture.src = reader.result;
      });
    }
    reader.readAsDataURL(file);
  });

  var addClickPicture = function (pictureClicked) {
    var onClick = function () {
      var picturesList = pictureContainer.querySelectorAll('.ad-form__photo');
      if (picturesList.length === 1) {
        pictureClicked.removeEventListener('click', onClick);
        var image = pictureClicked.querySelector('img');
        image.parentNode.removeChild(image);
      } else {
        pictureClicked.removeEventListener('click', onClick);
        pictureClicked.parentNode.removeChild(pictureClicked);
      }
    };
    pictureClicked.addEventListener('click', onClick);
  };

})();
