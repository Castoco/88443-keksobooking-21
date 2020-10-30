'use strict';
(function () {


  window.util = {
    getRandomNumber: function (min, max) { // ------------------ случайные числа
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getStrRandom: function (arr) { // ------------------ строки случайной длины
      let randomStr;
      randomStr = arr.slice(0, this.getRandomNumber(0, arr.length));
      return randomStr;
    }
  };

})();
