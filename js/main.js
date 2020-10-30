'use strict';
(function () {

  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`).querySelectorAll(`select`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = adForm.querySelectorAll(`fieldset`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const mapList = map.querySelector(`.map__pins`);


  // --------------------------------------------------Состояние до активации карты


  const disabledForm = function () {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);

    for (let i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].setAttribute(`disabled`, `disabled`);
    }

    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].setAttribute(`disabled`, `disabled`);
    }
  };

  disabledForm();

  // -------------------------------------------------- конец


  // -------------------------------------------------- Ищу адрес точки
  const mainPinWidth = 65;
  const mainPinHeight = 65;
  const mainPinCenter = {
    x: mainPin.offsetLeft + Math.round(mainPinWidth / 2),
    y: mainPin.offsetTop + Math.round(mainPinHeight / 2)
  };

  const mainPinArrow = {
    x: mainPin.offsetLeft + Math.round(mainPinWidth / 2),
    y: mainPin.offsetTop + mainPinHeight
  };

  const addressField = adForm.querySelector(`#address`);

  const getMainPinAdress = (position) => {
    addressField.setAttribute(`value`, `${position.x}, ${position.y}`);
    addressField.setAttribute(`readonly`, `readonly`);
  };

  getMainPinAdress(mainPinCenter);
  // -------------------------------------------------- Нашел адрес точки

  // ------------------------------------ Активирую форму и создаю базу пинов, по клику на главную кнопку(начало)

  const onPinMouseDown = function (evt) {
    if (evt.which === 1) {
      activatePins();
      activateForm();
    }
    mainPin.removeEventListener(`mousedown`, onPinMouseDown);
  };

  const onPinKeyDown = function (evt) {
    if (evt.key === `Enter`) {
      activatePins();
      activateForm();
    }
    mainPin.removeEventListener(`keydown`, onPinKeyDown);
  };

  mainPin.addEventListener(`mousedown`, onPinMouseDown);
  mainPin.addEventListener(`keydown`, onPinKeyDown);

  // Активирую форму и создаю базу пинов по клику на главную кнопку( окончание работы)

  const activateForm = function () {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    getMainPinAdress(mainPinArrow);

    for (let i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].removeAttribute(`disabled`, `disabled`);
    }

    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute(`disabled`, `disabled`);
    }
  };

  const activatePins = function () {
    const mapFragment = document.createDocumentFragment();
    const pinsBase = window.data.getRandomPins();
    for (let i = 0; i < pinsBase.length; i++) {
      let pin = window.data.renderElement(pinsBase[i]);
      onClickPin(pin, pinsBase[i]); // Обработчик кликов на пин
      mapFragment.appendChild(pin);
      mapList.appendChild(mapFragment);
    }
  };

  const onClickPin = function (pin, base) {
    pin.addEventListener(`click`, function () {
      const activedPin = map.querySelector('.map__pin--active');
      if (map.querySelector(`.popup`)) {
        closePopup(activedPin);
      }
      if (activedPin) {
        activedPin.classList.remove('map__pin--active');
      }
      window.card.makeCard(base);
      pin.classList.add('map__pin--active');
    });
  };

  const closePopup = function () {
    map.querySelector(`.popup`).remove();
    document.removeEventListener(`keydown`, opPopuPressEsc);
    map.querySelector('.map__pin--active').classList.remove('map__pin--active');
  };

  const opPopuPressEsc = function (evt) {
    if (evt.key === `Escape`) {
      closePopup();
    }
  };
  // ------------------------------Валидация формы (Гости и комнаты) старт

  // ---------------------------------Валидация формы (Гости и комнаты) Конец
  window.main = {
    map: map,
    closePopup: closePopup,
    opPopuPressEsc: opPopuPressEsc,
    adForm: adForm
  };

})();
