'use strict';


const MAX_ROOMS = 100;
const NOT_GUESTS = 0;
const INPUT_SHADOW = `0 0 2px 2px #ff0000`;
const TITLE_LENGTH_MIN = 30;
const TITLE_LENGTH_MAX = 100;
const rooms = window.main.adForm.querySelector(`#room_number`);
const capacity = window.main.adForm.querySelector(`#capacity`);
const adPrice = window.main.adForm.querySelector(`#price`);
const adType = window.main.adForm.querySelector(`#type`);
const adTimein = window.main.adForm.querySelector(`#timein`);
const adTimeout = window.main.adForm.querySelector(`#timeout`);
const successModal = document.querySelector(`#success`).content.querySelector(`.success`);
const errorModal = document.querySelector(`#error`).content.querySelector(`.error`);
const mainpage = document.querySelector(`main`);
const buttonReset = document.querySelector(`.ad-form__reset`);

const activate = () => {
  window.main.map.classList.remove(`map--faded`);
  window.main.adForm.classList.remove(`ad-form--disabled`);

  window.main.inputs.forEach((input) => {
    input.removeAttribute(`disabled`, `disabled`);
  });
};

const makeAd = (evt) => {
  evt.target.setCustomValidity(``);
  evt.target.style.boxShadow = ``;

  if (evt.target.matches(`#capacity`) || evt.target.matches(`#room_number`)) {
    rooms.setCustomValidity(``);
    rooms.style.boxShadow = ``;
    capacity.setCustomValidity(``);
    capacity.style.boxShadow = ``;
    if (parseInt(rooms.value, 10) !== MAX_ROOMS && parseInt(capacity.value, 10) === NOT_GUESTS
    || parseInt(rooms.value, 10) === MAX_ROOMS && parseInt(capacity.value, 10) !== NOT_GUESTS) {
      evt.target.setCustomValidity(`Выберете другое количество гостей для ${rooms.value} комнат`);
      evt.target.style.boxShadow = INPUT_SHADOW;
    }

    if (parseInt(capacity.value, 10) > parseInt(rooms.value, 10)) {
      evt.target.setCustomValidity(`Много гостей для ${rooms.value}  комнаты`);
      evt.target.style.boxShadow = INPUT_SHADOW;
    }
  }

  if (evt.target.matches(`#title`)) {
    const valueLength = evt.target.value.length;
    evt.target.setCustomValidity(``);
    if (valueLength < TITLE_LENGTH_MIN) {
      evt.target.setCustomValidity(`Минимум ${TITLE_LENGTH_MIN} символов, введите еще ${TITLE_LENGTH_MIN - valueLength} симв`);
      evt.target.style.boxShadow = INPUT_SHADOW;
    }
    if (valueLength > TITLE_LENGTH_MAX) {
      evt.target.setCustomValidity(`Максимум ${TITLE_LENGTH_MAX} символов, удалите еще  ${valueLength - TITLE_LENGTH_MAX} симв`);
      evt.target.style.boxShadow = INPUT_SHADOW;
    }
  }

  if (evt.target.matches(`#type`)) {
    adPrice.setAttribute(`placeholder`, `${window.data.TYPE_HOTEL[evt.target.value].minprice}`);
    adPrice.setAttribute(`min`, `${window.data.TYPE_HOTEL[evt.target.value].minprice}`);
  }

  if (evt.target.matches(`#price`) || evt.target.matches(`#type`)) {
    adPrice.setCustomValidity(``);
    adType.setCustomValidity(``);
    adPrice.style.boxShadow = ``;
    adType.style.boxShadow = ``;
    if (adPrice.value < window.data.TYPE_HOTEL[adType.value].minprice) {
      evt.target.setCustomValidity(`Минимальная цена, для данного типа жилья ${window.data.TYPE_HOTEL[adType.value].minprice} руб`);
      evt.target.style.boxShadow = INPUT_SHADOW;
    }
  }

  if (evt.target.matches(`#timein`)) {
    adTimeout.value = adTimein.value;
  }
  if (evt.target.matches(`#timeout`)) {
    adTimein.value = adTimeout.value;
  }

  evt.target.reportValidity();
};

window.main.adForm.addEventListener(`input`, makeAd);

// -------------------------------------------------------- Сообщение об успешной отправке формы
const getSucces = () => {
  const element = successModal .cloneNode(true);
  modalRender(element);
  window.main.adForm.reset();
  reset();
};

// ------------------------------------------------------- Сообщение о неудачной отправке формы
const getError = () => {
  const element = errorModal.cloneNode(true);
  modalRender(element);
};

// ------------------------------------------------------- Функция отрисовки модалки
const modalRender = (element) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  mainpage.appendChild(fragment);
  document.addEventListener(`keydown`, window.onModalPressEsc);
  element.addEventListener(`click`, (evt)=> {
    evt.preventDefault();
    element.remove();
  });
};

// ---------------------------------------------- Закрытие модального окна и удаление обработчика по Keydow Escape
const modalClose = () => {
  const succes = document.querySelector(`.success`);
  const error = document.querySelector(`.error`);
  if (succes) {
    succes.remove();
  } else if (errorModal) {
    error.remove();
  }
  document.removeEventListener(`keydown`, window.onModalPressEsc);
};

window.util.onModalPressEsc(modalClose);

const reloadPage = () => {
  window.main.disabledPage();
  window.main.closePopup();
  window.main.mainPin.addEventListener(`mousedown`, window.main.onPinMouseDown);
  window.main.mainPin.addEventListener(`keydown`, window.main.onPinKeyDown);
};

const reset = () => {
  window.main.adForm.reset();
  window.filterMap.mapFilters.reset();
  reloadPage();
  adPrice.setAttribute(`placeholder`, `${window.data.TYPE_HOTEL[`house`].minprice}`);
};

// ------------------ Экспорт
window.form = {
  activate,
  adPrice,
  mainpage,
  getSucces,
  getError,
  buttonReset,
  reloadPage,
  reset,
  makeAd,
  INPUT_SHADOW,
};


