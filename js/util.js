'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 500; // ms

  const renderErrorMesage = (message) => { // ------- Сообщение об ошибке
    const fail = document.createElement(`div`);
    fail.textContent = message;
    fail.style = `width: 100%; height: 100px; margin: 0 auto; background: red; text-align: center; top: 300px`;
    fail.style.position = `absolute`;
    fail.style.fontSize = `30px`;
    window.main.map.append(fail);
  };

  let lastTimeout = null;

  const debounce = (cb) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  const onModalPressEsc = (evt, cb) => {
    if (evt.key === `Escape`) {
      cb();
    }
  };

  window.util = {
    renderErrorMesage,
    debounce,
    onModalPressEsc
  };

})();
