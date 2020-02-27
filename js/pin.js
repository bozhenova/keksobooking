"use strict";

(function () {
  const ADS_QUANTITY = 5;
  const mapPins = document.querySelector('.map__pins');
  const mapPinTemplate = document.querySelector('#pin').content;

  window.pin = {
    createPin:
      function (ad) {
        const pin = mapPinTemplate.cloneNode(true);
        const pinImage = pin.querySelector('img');
        pin.style.left = `${ad.location.x + pinImage.offsetWidth / 2}px`;
        pin.style.top = `${ad.location.y - pinImage.offsetHeight}px`;
        pinImage.src = `${ad.author.avatar}`;
        pinImage.alt = `Заголовок объявления`;
        return pin;
      },

    renderPins:
      function (ads) {
        window.pin.deleteSimilarPins();
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < ads.length && i < ADS_QUANTITY; i++) {
          const pin = window.pin.createPin(ads[i]);
          pin.addEventListener('click', () => {
            window.map.renderCard(ads[i]);
          });
          fragment.append(pin);
        }
        mapPins.append(fragment);
      },

    deleteSimilarPins:
      function () {
        mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(pin => {
          pin.remove()
        });
      }
  };

})();