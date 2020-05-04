'use strict';

(function () {
  const RoomsCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  const type = document.querySelector("#type");
  const price = document.querySelector("#price");
  const checkin = document.querySelector("#timein");
  const checkout = document.querySelector("#timeout");
  const rooms = document.querySelector("#room_number");
  const features = document.querySelectorAll('.feature__checkbox');
  const description = document.querySelector("#description");
  const guests = document.querySelector("#capacity");
  const submitButton = document.querySelector('.ad-form__submit');
  const form = document.querySelector('.ad-form');
  const uploadAvatarButton = document.querySelector('.ad-form-header__input')
  const uploadPhotosButton = document.querySelector('.ad-form__input');
  const resetButton = document.querySelector('.ad-form__reset');

  type.addEventListener("change", setMinPrice);
  submitButton.addEventListener('click', validateForm);

  uploadAvatarButton.addEventListener('change', window.uploadImage);
  uploadPhotosButton.addEventListener('change', window.uploadPhotos);
  resetButton.addEventListener('click', resetSettings);

  function setMinPrice(e) {
    switch (e.target.value) {
      case 'bungalo':
        price.min = 0;
        break;
      case 'flat':
        price.min = 1000;
        break;
      case 'house':
        price.min = 5000;
        break;
      case 'palace':
        price.min = 10000;
        break;
    }
  }

  function validateGuests() {
    if (RoomsCapacity[rooms.value].indexOf(+guests.value) === -1) {
      guests.setCustomValidity('Гостей слишком много для выбранного количества комнат');
    } else {
      guests.setCustomValidity('');
    }
  }

  function validateCheckTime() {
    if (checkin.value !== checkout.value) {
      checkout.setCustomValidity('Время заезда и выезда должно совпадать');
    } else {
      checkout.setCustomValidity('');
    }
  }

  function validatePrice() {
    if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Цена за ночь должна быть как минимум ' + price.min);
    } else if (price.validity.rangeOverflow) {
      price.setCustomValidity('Цена за ночь должна быть максимум ' + price.max);
    } else if (price.validity.stepMismatch) {
      price.setCustomValidity('Введите целое значение');
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  }

  function validateForm() {
    validateGuests();
    validateCheckTime();
    validatePrice();
  }

  function resetSettings() {
    price.value = null;
    title.value = null;
    type.value = 'flat';
    description.value = null;
    checkin.value = "12:00";
    checkout.value = "12:00";
    window.drag.resetPinCoords();
    [...features].forEach((feature) => feature.checked = false);
    window.deleteUploadedPhotos();
    window.deleteUploadedAvatar();
  }

  form.addEventListener('submit', e => {
    window.backend.save(new FormData(form), successSubmitHandler, window.errorHandler);
    e.preventDefault();
  });

  function successSubmitHandler() {
    resetSettings();
    const successTemplate = document.querySelector('#success').content;
    const success = successTemplate.cloneNode(true);
    document.body.appendChild(success);
    document.addEventListener('click', closeSuccessOverlay);
    document.addEventListener('keydown', escPressHandler);
  }

  function escPressHandler(e) {
    if (window.utils.isEscEvent(e)) {
      closeSuccess();
    }
  }

  function closeSuccessOverlay() {
    const successOverlay = document.querySelector('.success');
    successOverlay.remove();

    document.removeEventListener('keydown', escPressHandler);
    document.removeEventListener('click', closeSuccessOverlay);
  }


})();
