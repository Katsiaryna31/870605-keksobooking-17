'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserPicture = document.querySelector('.ad-form__input');
  var previewPicture = document.querySelector('.ad-form__photo');


  fileChooserPicture.addEventListener('change', function () {
    var file = fileChooserPicture.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
       return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var previewPictureAdd = document.createElement('img');
          previewPicture.appendChild(previewPictureAdd);
          previewPictureAdd.classList.add('ad-form-header__preview');
          previewPictureAdd.src = reader.result;
          previewPictureAdd.addEventListener('click', function () {
            previewPictureAdd.parentNode.removeChild(previewPictureAdd);
          });
        });

        reader.readAsDataURL(file);
      }
  });

})();
