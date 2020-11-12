'use strict';
(function () {
  const MAINPINWIDTH = 65;
  const MAINPIN_HEIGHT = 65;
  const MAIN_PIN_SCALE = Math.round(MAINPINWIDTH / 2);
  const MAP_START = 0;
  const PIN_SCALE_AFTER = 15;
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_POST = `https://21.javascript.pages.academy/keksobooking`;
  const GET = `GET`;
  const POST = `POST`;
  const MAIN_PIN_TOP = `375`;
  const MAIN_PIN_LEFT = `570`;
  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`).querySelectorAll(`select`);
  const adForm = document.querySelector(`.ad-form`);
  const formFilters = adForm.querySelectorAll(`select`);
  const formInputs = adForm.querySelectorAll(`input`);
  const addressField = adForm.querySelector(`#address`);
  const adTextArea = adForm.querySelector(`textarea`);
  const adButton = adForm.querySelectorAll(`button`);
  const mainPin = map.querySelector(`.map__pin--main`);

  // ----------------------------------------------- Модуль перетаскивания главной кнопки.
  const movingPin = function () {
    mainPin.addEventListener(`mousedown`, function (evt) {
      evt.preventDefault();

      let startCords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        getMainPinAdress();

        const shift = {
          x: startCords.x - moveEvt.clientX,
          y: startCords.y - moveEvt.clientY
        };

        startCords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (((mainPin.offsetLeft - shift.x) + MAIN_PIN_SCALE) >= MAP_START &&
        ((mainPin.offsetLeft - shift.x) + MAIN_PIN_SCALE) <= window.data.MAP_WIDTH) {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
        }
        if (((mainPin.offsetTop - shift.y) + MAINPIN_HEIGHT + PIN_SCALE_AFTER) >= window.data.MAP_TOP_Y &&
        ((mainPin.offsetTop - shift.y) + MAINPIN_HEIGHT + PIN_SCALE_AFTER) <= window.data.MAP_BOTTOM_Y) {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
        }
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };
  movingPin();

  // -------------------------------------------------- Поиск координат главной кнопки
  const mainPinCenter = {
    x: mainPin.offsetLeft + MAIN_PIN_SCALE,
    y: mainPin.offsetTop + Math.round(MAINPIN_HEIGHT / 2)
  };

  const getMainPinAdress = (position) => {
    if (position === undefined) {
      position = {
        x: mainPin.offsetLeft + MAIN_PIN_SCALE,
        y: mainPin.offsetTop + MAINPIN_HEIGHT + PIN_SCALE_AFTER
      };
    }

    addressField.setAttribute(`value`, `${position.x}, ${position.y}`);
    addressField.setAttribute(`readonly`, `readonly`);

    return position;
  };

  // ----------------------------------------------------------Состояние страницы до активации карты

  const getInputs = function () {
    const filters = Array.from(formFilters);
    const adInput = Array.from(formInputs);
    const allInputs = adInput.concat(filters);
    allInputs.push(adTextArea);
    const button = Array.from(adButton);
    const selectMap = Array.from(mapFilters);
    const array = button.concat(selectMap);

    return array.concat(allInputs);
  };
  const inputs = getInputs();

  const disabledPage = function () {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute(`disabled`, `disabled`);
      inputs[i].style.boxShadow = ``;
    }

    const buttons = map.querySelectorAll(`.map__pin`);
    for (let i = 1; i < buttons.length; i++) {
      buttons[i].remove();
    }

    mainPin.style.top = `${MAIN_PIN_TOP}px`;
    mainPin.style.left = `${MAIN_PIN_LEFT}px`;
    getMainPinAdress(mainPinCenter);
  };
  disabledPage();

  // ---------------------------------------------- Вызываю активвацию формы и карты при кликле на главную кнопку

  const onPinMouseDown = function (evt) {
    if (evt.which === 1) {
      activatePins();
      window.form.activateForm();
    }
    mainPin.removeEventListener(`mousedown`, onPinMouseDown);
  };

  const onPinKeyDown = function (evt) {
    if (evt.key === `Enter`) {
      activatePins();
      window.form.activateForm();
    }
    mainPin.removeEventListener(`keydown`, onPinKeyDown);
  };

  mainPin.addEventListener(`mousedown`, onPinMouseDown);
  mainPin.addEventListener(`keydown`, onPinKeyDown);

  // ---------------------------------------------------------------- Функция активации пинов
  const activatePins = function () {
    getMainPinAdress();
    window.dataServer.load(URL_GET, GET, window.filterMap.successHandler, window.util.renderErrorMesage);

    window.form.buttonReset.addEventListener(`click`, window.form.resetForm);
  };

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.dataServer.load(URL_POST, POST, window.form.getSucces, window.form.getError, new FormData(adForm));
  });


  // -------------------------------------------------------------- дествие с пинами на карте, при клике.


  const onClickPin = function (pin, base) {
    pin.addEventListener(`click`, function () {
      const activedPin = map.querySelector(`.map__pin--active`);
      if (map.querySelector(`.popup`)) {
        closePopup();
      }
      if (activedPin) {
        activedPin.classList.remove(`map__pin--active`);
      }
      window.card.makeCard(base);
      pin.classList.add(`map__pin--active`);
    });
  };

  const closePopup = function () {
    const popup = map.querySelector(`.popup`);
    if (popup) {
      popup.remove();
    }
    document.removeEventListener(`keydown`, onPopupPressEsc);
    const activedPin = map.querySelector(`.map__pin--active`);
    if (activedPin) {
      activedPin.classList.remove(`map__pin--active`);
    }
  };

  const onPopupPressEsc = function (evt) {
    if (evt.key === `Escape`) {
      closePopup();
    }
  };

  // --------------------------------------------------- Экспорт -----
  window.main = {
    onClickPin,
    getMainPinAdress,
    map,
    closePopup,
    onPopupPressEsc,
    adForm,
    mapFilters,
    inputs,
    disabledPage,
    mainPin,
    onPinMouseDown,
    getInputs
  };

})();
