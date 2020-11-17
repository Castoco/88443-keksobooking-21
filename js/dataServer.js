'use strict';
(function () {

  const CODE = {
    ok: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404
  };

  const load = (url, method, onSuccess, onError, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, () => {
      let sms;
      switch (xhr.status) {
        case CODE.ok:
          onSuccess(xhr.response);
          break;
        case CODE.BadRequest:
          sms = `Неверный запрос ${xhr.status} + ${xhr.statusText}`;
          break;
        case CODE.Unauthorized:
          sms = `Пользователь не авторизован`;
          break;
        case CODE.NotFound:
          sms = `Ничего не найдено`;
          break;

        default:
          sms = `${xhr.status}  + ${xhr.statusText}`;
      }
      if (sms) {
        onError(sms);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.open(method, url);
    xhr.send(data);
  };

  window.dataServer = {
    load
  };

}());

