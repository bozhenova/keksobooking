"use strict";

(function () {
  const mapPins = document.querySelector('.map__pins');
  const mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function createPin(ad) {
    const pin = mapPinTemplate.cloneNode(true);
    const pinImage = pin.querySelector('img');
    pin.style.left = `${ad.location.x + pinImage.offsetWidth / 2}px`;
    pin.style.top = `${ad.location.y - pinImage.offsetHeight}px`;
    pinImage.src = `${ad.author.avatar}`;
    pinImage.alt = `Заголовок объявления`;
    return pin;
  }

  window.renderPins = function (ads) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < ads.length; i++) {
      const pin = createPin(ads[i]);
      pin.addEventListener('click', () => {
        window.renderCard(ads[i]);
        document.querySelector('.map__card').classList.remove('hidden');
      });
      fragment.append(pin);
    }
    mapPins.append(fragment);
  }



})();