'use strict';
(function () {

  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_POST = `https://21.javascript.pages.academy/keksobooking`;
  const GET = `GET`;
  const POST = `POST`;
  const MAIN_PIN_TOP = `375`;
  const MAIN_PIN_LEFT = `570`;
  const LEFT_MOUSE_BUTTON = 1;
  const map = window.moving.map;
  const mapSelects = map.querySelector(`.map__filters`).querySelectorAll(`select`);
  const mapInputs = map.querySelector(`.map__features`).querySelectorAll(`input`);
  const adForm = window.moving.adForm;
  const formFilters = adForm.querySelectorAll(`select`);
  const formInputs = adForm.querySelectorAll(`input`);
  const adTextArea = adForm.querySelector(`textarea`);
  const adButton = adForm.querySelectorAll(`button`);
  const mainPin = map.querySelector(`.map__pin--main`);

  // ----------------------------------------------------------Состояние страницы до активации карты
  const getInputs = () => {
    const filters = Array.from(formFilters);
    const adInput = Array.from(formInputs);
    const adInputs = adInput.concat(filters);
    adInputs.push(adTextArea);
    const button = Array.from(adButton);
    const formInputsButtons = adInputs.concat(button);
    const selectMap = Array.from(mapSelects);
    const inputMap = Array.from(mapInputs);
    const mapFilter = selectMap.concat(inputMap);

    return formInputsButtons.concat(mapFilter);
  };

  const inputs = getInputs();

  const disabledPage = () => {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);

    inputs.forEach((input) => {
      input.setAttribute(`disabled`, `disabled`);
      input.style.boxShadow = ``;
    });

    const buttons = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

    buttons.forEach((button) => {
      button.remove();
    });

    mainPin.style.top = `${MAIN_PIN_TOP}px`;
    mainPin.style.left = `${MAIN_PIN_LEFT}px`;
    window.moving.getMainPinAdress(window.moving.mainPinCenter);
  };
  disabledPage();

  // ---------------------------------------------- Вызываю активвацию формы и карты при кликле на главную кнопку

  const onPinMouseDown = (evt) => {
    if (evt.which === LEFT_MOUSE_BUTTON) {
      activatePins();
      window.form.activate();
    }
    mainPin.removeEventListener(`mousedown`, onPinMouseDown);
  };

  const onPinKeyDown = (evt) => {
    if (evt.key === `Enter`) {
      activatePins();
      window.form.activate();
      mainPin.removeEventListener(`keydown`, onPinKeyDown);
    }
  };

  mainPin.addEventListener(`mousedown`, onPinMouseDown);
  mainPin.addEventListener(`keydown`, onPinKeyDown);

  // ---------------------------------------------------------------- Функция активации пинов
  const activatePins = () => {
    window.moving.getMainPinAdress();
    window.dataServer.load(URL_GET, GET, window.filterMap.successHandler, window.util.renderErrorMesage);
    window.form.buttonReset.addEventListener(`click`, window.form.reset);
  };

  adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    window.dataServer.load(URL_POST, POST, window.form.getSucces, window.form.getError, new FormData(adForm));
  });


  // -------------------------------------------------------------- дествие с пинами на карте, при клике.


  const onClickPin = (pin, base) => {
    pin.addEventListener(`click`, () => {
      const activedPin = map.querySelector(`.map__pin--active`);
      if (map.querySelector(`.popup`)) {
        closePopup();
      }
      if (activedPin) {
        activedPin.classList.remove(`map__pin--active`);
      }
      window.card.makeOffer(base);
      pin.classList.add(`map__pin--active`);
    });
  };

  const closePopup = () => {
    const popup = map.querySelector(`.popup`);
    if (popup) {
      popup.remove();
    }
    document.removeEventListener(`keydown`, onCardPessEsc);
    const activedPin = map.querySelector(`.map__pin--active`);
    if (activedPin) {
      activedPin.classList.remove(`map__pin--active`);
    }
  };

  const onCardPessEsc = (evt) => {
    window.util.onModalPressEsc(evt, closePopup);
  };

  // --------------------------------------------------- Экспорт -----
  window.main = {
    onClickPin,
    map,
    closePopup,
    adForm,
    inputs,
    disabledPage,
    mainPin,
    onPinMouseDown,
    getInputs,
    onCardPessEsc
  };

})();
