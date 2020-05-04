"use strict";

(function () {
  const errorTemplate = document.querySelector('#error').content;

  window.errorHandler = function (errorMessage) {
    renderError(errorMessage);
    document.addEventListener('keydown', escPressHandler);
    document.addEventListener('click', closeError);
  };

  function renderError(message) {
    const error = errorTemplate.cloneNode(true);
    const fragment = document.createDocumentFragment();

    error.querySelector('.error__message').textContent = message;
    fragment.appendChild(error);
    document.body.appendChild(fragment);
  }

  function escPressHandler(e) {
    if (window.utils.isEscEvent(e)) {
      closeError();
    }
  }

  function closeError() {
    const errorOverlay = document.querySelector('.error');
    errorOverlay.remove();

    document.removeEventListener('keydown', escPressHandler);
    document.removeEventListener('click', closeError);
  }


})();