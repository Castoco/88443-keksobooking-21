'use strict';
(function () {

  const load = function (onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    const URL = 'https://21.javascript.pages.academy/keksobooking/data';


    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      let sms;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          sms = 'Неверный запрос';
          break;
        case 401:
          sms = 'Пользователь не авторизован';
          break;
        case 404:
          sms = 'Ничего не найдено';
          break;

        default:
          sms = xhr.status + ' ' + xhr.statusText;
      }

      if (sms) {
        onError(sms);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', URL);
    xhr.send();

  };

  window.dataServer = {
    load,
  };

}());
