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

  window.util = {
    getRandomNumber,
    getStrRandom
  };

})();
