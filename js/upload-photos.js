"use strict";

(function () {

  const adFormPhoto = document.querySelector('.ad-form__photo');
  const photoGallery = document.querySelector('.ad-form__photo-gallery');
  let photoChooser = document.querySelector('#images');

  window.uploadPhotos = function () {
    if (this.files && this.files[0]) {
      deleteEmptyPhotos();
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < this.files.length; i++) {
        const photoElement = adFormPhoto.cloneNode(true);
        const photo = document.createElement('img');
        photo.src = URL.createObjectURL(this.files[i]);
        photo.height = 70;
        photo.width = 70;
        photo.className = "ad-form__image";
        photo.alt = 'Фотография жилья';
        photo.style.borderRadius = '5px';
        photoElement.addEventListener('mouseenter', mouseEnterHandler);
        photoElement.addEventListener('mouseleave', mouseLeaveHandler);
        photoElement.append(photo);
        photo.onload = () => {
          URL.revokeObjectURL(this.src);
        }
        fragment.append(photoElement);
      }
      if (adFormPhoto) {
        adFormPhoto.remove();
      }
      photoGallery.append(fragment);
      let sortable = Sortable.create(photoGallery);
    }

  };

  function mouseEnterHandler(e) {
    let target = e.target;
    target.classList.add('ad-form__photo--delete');

    target.addEventListener('click', photoClickHandler);
  }

  function mouseLeaveHandler(e) {
    let target = e.target;
    target.classList.remove('ad-form__photo--delete');

    adFormPhoto.removeEventListener('mouseenter', mouseEnterHandler);
    adFormPhoto.removeEventListener('mouseover', mouseLeaveHandler);
  }

  function photoClickHandler(e) {
    let photo = e.currentTarget;
    photoGallery.removeChild(photo);
    photoChooser.value = '';

    if (photoGallery.querySelectorAll('.ad-form__photo').length === 0) {
      photoGallery.append(createEpmtyPhoto());
    }
  }

  function createEpmtyPhoto() {
    let emptyPhoto = document.createElement('div');
    emptyPhoto.classList.add('ad-form__photo');

    return emptyPhoto;
  }

  function deleteEmptyPhotos() {
    if (!photoGallery.querySelector('.ad-form__photo img')) {
      photoGallery.querySelectorAll('.ad-form__photo').forEach((preview) => {
        photoGallery.removeChild(preview);
      });
    }
  }

  window.deleteUploadedPhotos = function () {
    if (photoGallery.querySelector('.ad-form__photo img')) {
      photoGallery.querySelectorAll('.ad-form__photo').forEach((preview) => {
        photoGallery.removeChild(preview);
      });
      photoGallery.appendChild(createEpmtyPhoto());
    }
  }

})();