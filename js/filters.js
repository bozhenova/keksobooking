"use strict";
(function () {

  const form = document.querySelector('.map__filters');
  const housingType = document.querySelector('#housing-type');
  const housingPrice = document.querySelector('#housing-price');
  const housingRooms = document.querySelector('#housing-rooms');
  const housingGuests = document.querySelector('#housing-guests');
  const housingFeatures = document.querySelectorAll('.map__checkbox');

  function sortByType(pins) {
    if (housingType.value === 'any') {
      return pins;
    }
    return pins.filter(pin => {
      return pin.offer.type === housingType.value;
    });
  };

  function sortByPrice(pins) {
    if (housingPrice.value === 'middle') {
      return pins.filter(pin => {
        return pin.offer.price >= 10000 && pin.offer.price <= 50000;
      });
    }

    if (housingPrice.value === 'low') {
      return pins.filter(pin => {
        return pin.offer.price <= 10000;
      });
    }

    if (housingPrice.value === 'high') {
      return pins.filter(pin => {
        return pin.offer.price >= 50000;
      });
    }

    return pins;
  };

  function sortByRooms(pins) {
    if (housingRooms.value === 'any') {
      return pins;
    }

    return pins.filter(pin => {
      return pin.offer.rooms === parseInt(housingRooms.value, 10);
    });
  };

  function sortByGuests(pins) {
    if (housingGuests.value === 'any') {
      return pins;
    }

    return pins.filter(pin => {
      return pin.offer.guests === parseInt(housingGuests.value, 10);
    });
  };

  function sortByFeatures(pins) {
    let checkedFeatures = [...housingFeatures].
      filter(feature => {
        return feature.checked === true;
      }).
      map(feature => {
        return feature.value;
      });

    if (checkedFeatures.length === 0) {
      return pins;
    }

    return pins.filter(pin => {
      return checkedFeatures.every(feature => {
        return pin.offer.features.includes(feature);
      });
    });
  };


  function sortData(data) {
    let filteredData = sortByType(data);
    filteredData = sortByPrice(filteredData);
    filteredData = sortByRooms(filteredData);
    filteredData = sortByGuests(filteredData);
    filteredData = sortByFeatures(filteredData);

    return filteredData;
  };

  window.filters = {
    addFilters:
      function (data) {
        let changeFilters = function () {
          if (window.map.map.querySelector('.popup')) {
            window.map.deleteCard();
          }
          window.pin.renderPins(sortData(data));
        };

        form.addEventListener('change', window.debounce.bind(null, changeFilters));
      }
  }

})();