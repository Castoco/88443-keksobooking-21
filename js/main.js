'use strict';
(function () {

  const map = document.querySelector(`.map`);
  const mapFilters = map.querySelector(`.map__filters`).querySelectorAll(`select`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldset = adForm.querySelectorAll(`fieldset`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const mapList = map.querySelector(`.map__pins`);
  const mainPinWidth = 65;
  const mainPinHeight = 65;

  // -------------------------------------------------- Поиск координат главной кнопки

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
    const mapFragment = document.createDocumentFragment();
    const pinsBase = window.data.getRandomPins();
    getMainPinAdress(mainPinArrow);
    for (let i = 0; i < pinsBase.length; i++) {
      let pin = window.data.renderElement(pinsBase[i]);
      onClickPin(pin, pinsBase[i]); // Обработчик кликов на пин
      mapFragment.appendChild(pin);
      mapList.appendChild(mapFragment);
    }
  };


  // -------------------------------------------------------------- Вдествие с пинами на карте, при клике.
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
    document.removeEventListener(`keydown`, onPopuPressEsc);
    map.querySelector('.map__pin--active').classList.remove('map__pin--active');
  };

  const onPopuPressEsc = function (evt) {
    if (evt.key === `Escape`) {
      closePopup();
    }
  };

  // ---------------------------------------------- Экспорт -----
  window.main = {
    map,
    closePopup,
    onPopuPressEsc,
    adForm,
    mapFilters,
    adFormFieldset
  };

})();
