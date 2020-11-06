'use strict';
(function () {

  const load = function (onSuccess, onError, URL, type, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      let sms;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          sms = `Неверный запрос ${xhr.status} + ${xhr.statusText}`;
          break;
        case 401:
          sms = `Пользователь не авторизован`;
          break;
        case 404:
          sms = `Ничего не найдено`;
          break;

        default:
          sms = `${xhr.status}  + ${xhr.statusText}`;
      }
      if (sms) {
        onError(sms);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.open(type, URL);
    xhr.send(data);
    if (type === `POST`) {
      window.main.disabledPage();
      window.main.mainPin.addEventListener(`mousedown`, window.main.onPinMouseDown);
      window.main.mainPin.addEventListener(`keydown`, window.main.onPinKeyDown);

    }
  };

  window.dataServer = {
    load
  };

}());

