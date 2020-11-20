'use strict';

const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 65;
const MAIN_PIN_SCALE = Math.round(MAIN_PIN_WIDTH / 2);
const MAP_START = 0;
const PIN_SCALE_AFTER = 15;
const adForm = document.querySelector(`.ad-form`);
const addressField = adForm.querySelector(`#address`);
const map = document.querySelector(`.map`);
const mainPin = map.querySelector(`.map__pin--main`);

// ----------------------------------------------- Модуль перетаскивания главной кнопки.
const movingPin = () => {
  mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
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
      if (((mainPin.offsetTop - shift.y) + MAIN_PIN_HEIGHT + PIN_SCALE_AFTER) >= window.data.MAP_TOP_Y &&
          ((mainPin.offsetTop - shift.y) + MAIN_PIN_HEIGHT + PIN_SCALE_AFTER) <= window.data.MAP_BOTTOM_Y) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
      }
    };

    const onMouseUp = (upEvt) => {
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
  y: mainPin.offsetTop + Math.round(MAIN_PIN_HEIGHT / 2)
};

const getMainPinAdress = (position) => {
  if (!position) {
    position = {
      x: mainPin.offsetLeft + MAIN_PIN_SCALE,
      y: mainPin.offsetTop + MAIN_PIN_HEIGHT + PIN_SCALE_AFTER
    };
  }

  addressField.setAttribute(`value`, `${position.x}, ${position.y}`);
  addressField.setAttribute(`readonly`, `readonly`);

  return position;
};

window.moving = {
  mainPinCenter,
  movingPin,
  getMainPinAdress,
  adForm,
  map
};

