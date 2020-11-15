'use strict';
(function () {

  const getRandomNumber = function (min, max) { // ------------------ случайные числа
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getStrRandom = function (arr) { // ------------------ строки случайной длины
    let randomStr;
    randomStr = arr.slice(0, getRandomNumber(0, arr.length));
    return randomStr;
  };

  const renderErrorMesage = function (message) { // ------- Сообщение об ошибке
    const fail = document.createElement(`div`);
    fail.textContent = message;
    fail.style = `width: 100%; height: 100px; margin: 0 auto; background: red; text-align: center; top: 300px`;
    fail.style.position = `absolute`;
    fail.style.fontSize = `30px`;
    window.main.map.append(fail);
  };

  const DEBOUNCE_INTERVAL = 1000; // ms

  let lastTimeout = null;

  const debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.util = {
    getRandomNumber,
    getStrRandom,
    renderErrorMesage,
    debounce
  };

})();
