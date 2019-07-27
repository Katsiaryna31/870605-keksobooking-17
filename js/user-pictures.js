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
        } else {
          var loadedImage = previewPicture.cloneNode(true);
          pictureContainer.appendChild(loadedImage);
        }
        picture.classList.add('ad-form-header__preview');
        picture.src = reader.result;
        var picturesList = pictureContainer.querySelectorAll('.ad-form__photo');
        addClickPicture (picturesList);
      });
    };
    reader.readAsDataURL(file);
  });

  var addClickPicture = function (picturesList) {
    picturesList.forEach(function (picture) {
      picture.addEventListener('click', onRemovePicture);
    });
  };

  var onRemovePicture = function () {
    var picturesList = pictureContainer.querySelectorAll('.ad-form__photo');
    if (picturesList.length !== 1) {
      this.parentNode.removeChild(this);
    } else {
      var img = this.querySelector('img');
      this.removeChild(img);
    }
  };

  window.userPicture = {
    remove: onRemovePicture
  };
})();
