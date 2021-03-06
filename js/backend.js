'use strict';

(function () {
  window.backend = {
    save:
      function (data, onLoad, onError) {
        const URL = 'https://js.dump.academy/keksobooking';
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
          const errorMessage = document.querySelector('.error__message');
          if (xhr.status === 200) {
            if (errorMessage) {
              errorMessage.remove();
            }
            onLoad(xhr.response);
          } else {
            onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
          }
        });

        xhr.addEventListener('error', () => {
          onError('Произошла ошибка соединения');
        });

        xhr.open('POST', URL);
        xhr.send(data);
      },

    load:
      function (onLoad, onError) {
        const URL = 'https://cors-anywhere.herokuapp.com/https://js.dump.academy/keksobooking/data';
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
          switch (xhr.status) {
            case 200:
              onLoad(xhr.response);
              break;
            case 400:
              onError('Неверный запрос');
              break;
            case 401:
              onError('Пользователь не авторизован');
              break;
            case 404:
              onError('Ничего не найдено');
              break;

            default:
              onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
          }
        });

        xhr.addEventListener('error', () => {
          onError('Произошла ошибка соединения');
        });

        xhr.addEventListener('timeout', () => {
          onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
        });

        xhr.timeout = 10000;

        xhr.open('GET', URL);
        xhr.send();
      }
  };

})();
