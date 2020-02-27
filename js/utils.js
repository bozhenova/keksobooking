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
    isEscEvent:
      function (e) {
        return e.code === 'Escape';
      }
  };


})();