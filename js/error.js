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
    fragment.append(error);
    document.body.append(fragment);
  }

  function escPressHandler() {
    if (window.utils.isEscEvent) {
      closeError();
    }
  }

  function closeError() {
    const errorOverlay = document.querySelector('.error');
    document.body.removeChild(errorOverlay);

    document.removeEventListener('keydown', escPressHandler);
    document.removeEventListener('click', closeError);
  }


})();