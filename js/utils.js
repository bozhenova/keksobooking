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
  };





})();