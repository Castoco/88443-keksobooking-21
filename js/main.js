'use strict';
(function () {

  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`).querySelectorAll(`select`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = adForm.querySelectorAll(`fieldset`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const mapList = map.querySelector(`.map__pins`);
  const MAINPINWIDTH = 65;
  const MAINPIN_HEIGHT = 65;
  const MAIN_PIN_SCALE = Math.round(MAINPINWIDTH / 2);
  const MAP_START = 0;
  const PIN_SCALE_AFTER = 15;
  const addressField = adForm.querySelector(`#address`);

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

        if (((mainPin.offsetLeft - shift.x) + MAIN_PIN_SCALE) >= MAP_START && ((mainPin.offsetLeft - shift.x) + MAIN_PIN_SCALE) <= window.data.MAP_WIDTH) {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
        }
        if (((mainPin.offsetTop - shift.y) + MAINPIN_HEIGHT + PIN_SCALE_AFTER) >= window.data.MAP_TOP_Y && ((mainPin.offsetTop - shift.y) + MAINPIN_HEIGHT + PIN_SCALE_AFTER) <= window.data.MAP_BOTTOM_Y) {
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

  getMainPinAdress(mainPinCenter);


  // ----------------------------------------------------------Состояние страницы до активации карты
  const disabledPage = function () {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);

    for (let i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].setAttribute(`disabled`, `disabled`);
    }

    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute(`disabled`, `disabled`);
    }
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
    window.dataServer.load(renderPins, window.util.renderErrorMesage);
  };

  const renderPins = function (pinsBase) {
    const mapFragment = document.createDocumentFragment();
    for (let i = 0; i < pinsBase.length; i++) {
      let pin = window.data.renderElement(pinsBase[i]);
      onClickPin(pin, pinsBase[i]); // Обработчик кликов на пин
      mapFragment.appendChild(pin);
      mapList.appendChild(mapFragment);
    }
  };

  // -------------------------------------------------------------- дествие с пинами на карте, при клике.
  const onClickPin = function (pin, base) {
    pin.addEventListener(`click`, function () {
      const activedPin = map.querySelector(`.map__pin--active`);
      if (map.querySelector(`.popup`)) {
        closePopup(activedPin);
      }
      if (activedPin) {
        activedPin.classList.remove(`map__pin--active`);
      }
      window.card.makeCard(base);
      pin.classList.add(`map__pin--active`);
    });
  };

  const closePopup = function () {
    map.querySelector(`.popup`).remove();
    document.removeEventListener(`keydown`, onPopupPressEsc);
    map.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
  };

  const onPopupPressEsc = function (evt) {
    if (evt.key === `Escape`) {
      closePopup();
    }
  };

  // ---------------------------------------------- Экспорт -----
  window.main = {
    getMainPinAdress,
    map,
    closePopup,
    onPopupPressEsc,
    adForm,
    mapFilters,
    adFormFieldset
  };

})();
