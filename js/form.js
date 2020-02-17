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
  const guests = document.querySelector("#capacity");
  const submitButton = document.querySelector('.ad-form__submit');

  let customValidityMessage = "";
  type.addEventListener("change", syncTypeOption);
  checkin.addEventListener("change", syncTime);
  checkout.addEventListener("change", syncTime);
  rooms.addEventListener('change', syncRoomOptions);
  submitButton.addEventListener('click', validateForm);

  function syncTypeOption(e) {
    switch (e.target.value) {
      case 'bungalo':
        price.placeholder = 0;
        price.min = 0;
        break;
      case 'flat':
        price.placeholder = 1000;
        price.min = 1000;
        break;
      case 'house':
        price.placeholder = 5000;
        price.min = 5000;
        break;
      case 'palace':
        price.placeholder = 10000;
        price.min = 10000;
        break;
    }
  }

  function syncRoomOptions(e) {
    switch (e.target.value) {
      case '1':
        guests.value = 1;
        break;
      case '2':
        guests.value = 2;
        break;
      case '3':
        guests.value = 3;
        break;
      case '100':
        guests.value = 0;
        break;
    }
  }


  function syncTime(e) {
    const value = e.target.value;
    checkin.value = value;
    checkout.value = value;
  }


  function validateGuests() {
    if (RoomsCapacity[rooms.value].indexOf(+guests.value) === -1) {
      guests.setCustomValidity('Гостей слишком много для выбранного количества комнат');
    } else {
      guests.setCustomValidity('');
    }
  };

  function validateCheckTime() {
    if (checkin.value !== checkout.value) {
      checkout.setCustomValidity('Время заезда и выезда должно совпадать');
    } else {
      checkout.setCustomValidity('');
    }
  };

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
  };

  function validateForm() {
    validateGuests();
    validateCheckTime();
    validatePrice();
  };


  function checkValidity(element) {
    if (customValidityMessage) {
      element.style.outline = '2px solid red';
      element.setCustomValidity(customValidityMessage);
    } else {
      element.setCustomValidity("");
      element.style.outline = '';
    }
  }

})();
