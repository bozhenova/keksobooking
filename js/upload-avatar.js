"use strict";

(function () {
  const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
  const avatarChooser = document.querySelector('#avatar');
  const adFormAvatar = document.querySelector('.ad-form-header__preview');
  const avatar = document.querySelector('.ad-form-header__preview img');

  window.uploadImage = function () {
    if (this.files && this.files[0]) {
      avatar.src = URL.createObjectURL(this.files[0]);
      avatar.height = 44;
      avatar.width = 40;
      adFormAvatar.addEventListener('mouseenter', mouseEnterHandler);
      adFormAvatar.addEventListener('mouseleave', mouseLeaveHandler);
      avatar.onload = () => {
        URL.revokeObjectURL(this.src);
      }
    }
  };

  window.deleteUploadedAvatar = function () {
    avatar.src = DEFAULT_AVATAR_SRC;
    avatarChooser.value = '';
    adFormAvatar.classList.remove('ad-form-header__preview--delete');
    adFormAvatar.removeEventListener('mouseenter', mouseEnterHandler);
    adFormAvatar.removeEventListener('mouseover', mouseLeaveHandler);
  };

  function mouseEnterHandler() {
    adFormAvatar.classList.add('ad-form-header__preview--delete');
    adFormAvatar.addEventListener('click', avatarClickHandler);
  }

  function mouseLeaveHandler() {
    adFormAvatar.classList.remove('ad-form-header__preview--delete');
    adFormAvatar.removeEventListener('click', avatarClickHandler);
  }

  function avatarClickHandler() {
    deleteUploadedAvatar();
  }



})();