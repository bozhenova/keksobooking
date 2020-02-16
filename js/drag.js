"use strict";

(function () {
  const MAIN_PIN_SIZE = {
    WIDTH: 62,
    HEIGHT: 62,
    LEG: 22
  };

  const map = document.querySelector('.map');
  const mapPinMain = map.querySelector('.map__pin--main');
  const adAddress = document.querySelector('#address');
  const mapOverlay = document.querySelector('.map__overlay');

  const startPosition = {
    x: mapPinMain.style.left,
    y: mapPinMain.style.top
  };
  adAddress.value = getAddress();

  const DragLimits = {
    MIN_X: 0 - MAIN_PIN_SIZE.WIDTH / 2,
    MAX_X: mapOverlay.offsetWidth - MAIN_PIN_SIZE.WIDTH / 2,
    MIN_Y: 180 - (MAIN_PIN_SIZE.HEIGHT + MAIN_PIN_SIZE.LEG),
    MAX_Y: 680 - (MAIN_PIN_SIZE.HEIGHT + MAIN_PIN_SIZE.LEG)
  };


  mapPinMain.addEventListener('mousedown', mouseDownHandler);

  function turnOnActiveMode() {
    map.classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    [...document.querySelectorAll('fieldset')].forEach(item => item.disabled = false);
    window.map.renderPins();
  }

  let dragged = false;
  function mouseDownHandler(e) {
    e.preventDefault();

    let startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    function mouseMoveHandler(e) {
      e.preventDefault();
      dragged = true;
      if (dragged) {
        map.style.cursor = "none";
        mapPinMain.style.cursor = "none";
      }
      const shift = {
        x: startCoords.x - e.clientX,
        y: startCoords.y - e.clientY
      };

      startCoords = {
        x: e.clientX,
        y: e.clientY
      }

      if (parseInt(mapPinMain.style.top, 10) > DragLimits.MAX_Y) {
        mapPinMain.style.top = `${DragLimits.MAX_Y}px`;
      } else if (parseInt(mapPinMain.style.top, 10) < DragLimits.MIN_Y) {
        mapPinMain.style.top = `${DragLimits.MIN_Y}px`;
      } else {
        mapPinMain.style.top = `${mapPinMain.offsetTop - shift.y}px`;
      }
      if (parseInt(mapPinMain.style.left, 10) > DragLimits.MAX_X) {
        mapPinMain.style.left = `${DragLimits.MAX_X}px`;
      } else if (parseInt(mapPinMain.style.left, 10) < DragLimits.MIN_X) {
        mapPinMain.style.left = `${DragLimits.MIN_X}px`;
      } else {
        mapPinMain.style.left = `${mapPinMain.offsetLeft - shift.x}px`;
      }
      adAddress.value = getAddress();
    }



    function mouseUpHandler(e) {
      e.preventDefault();
      if (map.classList.contains('map--faded')) {
        turnOnActiveMode();
      }
      dragged = false;
      if (!dragged) {
        map.style.cursor = "move";
        mapPinMain.style.cursor = "move";
      }
      adAddress.value = getAddress();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }


  function getPinCoords(pin, offsetX, offsetY) {
    return `${parseInt(pin.style.left, 10) + offsetX}, ${parseInt(pin.style.top, 10) + offsetY}`;
  };

  function getAddress() {
    return map.classList.contains('map--faded')
      ? getPinCoords(mapPinMain, MAIN_PIN_SIZE.WIDTH / 2, MAIN_PIN_SIZE.HEIGHT / 2)
      : getPinCoords(mapPinMain, MAIN_PIN_SIZE.WIDTH / 2, MAIN_PIN_SIZE.HEIGHT + MAIN_PIN_SIZE.LEG);
  };

  window.drag = {
    getAddress: getAddress,
    turnOnActiveMode: turnOnActiveMode,
    resetPinCoords: function () {
      mapPinMain.style.top = startPosition.y;
      mapPinMain.style.left = startPosition.x;
      adAddress.value = getAddress();
    }
  };

})();