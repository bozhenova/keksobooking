"use strict";

(function () {

  window.utils = {
    numberWithCommas:
      function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    getRandomNum:
      function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
    errorHandler:
      function (errorMessage) {
        const node = document.createElement('div');
        node.classList.add('error-message');
        node.style = 'display: block; z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; padding: 15px;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '40px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
      },
    uploadImage:
      function () {
        if (this.files && this.files[0]) {
          const adFormAvatar = document.querySelector('.ad-form-header__preview img');
          adFormAvatar.src = URL.createObjectURL(this.files[0]);
          adFormAvatar.height = 44;
          adFormAvatar.width = 40;
          adFormAvatar.onload = () => {
            URL.revokeObjectURL(this.src);
          }
        }
      },
    uploadPhotos:
      function () {
        if (this.files && this.files[0]) {
          const photoContainer = document.querySelector('.ad-form__photo-container');
          const fragment = document.createDocumentFragment();
          const adFormPhoto = document.querySelector('.ad-form__photo');
          for (let i = 0; i < this.files.length; i++) {
            const photoElement = adFormPhoto.cloneNode(true);
            const photo = document.createElement('img');
            photo.src = URL.createObjectURL(this.files[i]);
            photo.height = 70;
            photo.width = 70;
            photo.alt = 'Фотография жилья';
            photo.style.borderRadius = '5px';
            photoElement.append(photo);
            photo.onload = () => {
              URL.revokeObjectURL(this.src);
            }
            fragment.append(photoElement);
          }
          if (adFormPhoto) {
            adFormPhoto.remove();
          }
          photoContainer.append(fragment);
        }
      }
  };





})();