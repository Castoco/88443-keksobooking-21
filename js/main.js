/* eslint-disable no-lone-blocks */
'use strict';

const PIN_WIDTH_SCALE = 25;
const PIN_SCALE = 70;
const PINS_QUANTITY = 8;
const TYPE_HOTEL = {
  'palace': {
    'name': `Дворец`,
    'minprice': 10000
  },
  'flat': {
    'name': `Квартира`,
    'minprice': 1000
  },
  'house': {
    'name': `Дом`,
    'minprice': 5000
  },
  'bungalow': {
    'name': `Бунгало`,
    'minprice': 0
  },
};

const TITLE_WORDS = [`Номер`, `Хата`, `Дыра`, `Квартира`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const HOTEL_PHOTO = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP_WIDTH = 1200;
const MAP_START_X = 25;
const MAP_TOP_Y = 130;
const MAP_BOTTOM_Y = 630;
const TIME_CHECKIN = 12;
const TIME_CHECKOUT = 14;
const MIN_PRICE = 0;
const MAX_PRICE = 999;
const ROOMS_MAX = 15;
const ROOMS_MIN = 1;
const GUESTS_MIN = 1;
const GUESTS_MAX = 15;
const TYPES = Object.keys(TYPE_HOTEL);
const MAXROOMS = 100;
const NOTGUESTS = 0;
const INPUT_SHADOW = `0 0 2px 2px #ff0000`;
const TITLE_LENGTH_MIN = 30;
const TITLE_LENGTH_MAX = 100;


const map = document.querySelector(`.map`);
const mapFilters = map.querySelector(`.map__filters`).querySelectorAll(`select`);
const adForm = document.querySelector(`.ad-form`);
const adFormFieldset = adForm.querySelectorAll(`fieldset`);
const mainPin = map.querySelector(`.map__pin--main`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapList = document.querySelector(`.map__pins`);
const rooms = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);
const mapFilter = map.querySelector(`.map__filters-container`);
const pinPopupFragment = document.createDocumentFragment();
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const adPrice = adForm.querySelector(`#price`);
const adType = adForm.querySelector(`#type`);
const adTimein = adForm.querySelector('#timein');
const adTimeout = adForm.querySelector('#timeout');


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

// --------------------------------------------------Состояние до активации карты конец

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

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getStrRandom = function (arr) {
  let randomStr;
  randomStr = arr.slice(0, getRandomNumber(0, arr.length));

  return randomStr;
};

const randomPin = function (counter) {
  const pinLocationX = getRandomNumber(MAP_START_X, MAP_WIDTH);
  const pinLocationY = getRandomNumber(MAP_TOP_Y, MAP_BOTTOM_Y);
  const announcement =
    {
      'author': {
        'avatar': `img/avatars/user0${counter}.png`
      },
      'offer': {
        'title': `Это лучшая ${TITLE_WORDS[getRandomNumber(0, TITLE_WORDS.length - 1)]} во всем Токио!`,
        'address': `Адрес предложения ${pinLocationX}, ${pinLocationY}`,
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
        'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        'checkin': `${getRandomNumber(TIME_CHECKIN, TIME_CHECKOUT)}:00`,
        'checkout': `${getRandomNumber(TIME_CHECKIN, TIME_CHECKOUT)}:00`,
        'features': getStrRandom(FEATURES),
        'description': `В квартире есть все для комфортного проживания, СКИДКИ ОТ 3 ДНЕЙ И ПОСТОЯННЫМ КЛИЕНТАМ!!!`,
        'photos': getStrRandom(HOTEL_PHOTO)
      },
      'location': {
        'x': pinLocationX,
        'y': pinLocationY
      }
    }
  ;
  return announcement;
};

const getRandomPins = function () {
  const pins = [];
  for (let i = 1; i <= PINS_QUANTITY; i++) {
    pins.push(randomPin(i));
  }
  return pins;
};

const renderElement = function (render) {
  const element = pinTemplate.cloneNode(true);
  element.style = `left: ${render.location.x - PIN_WIDTH_SCALE}px; top: ${render.location.y - PIN_SCALE}px;`;
  element.querySelector(`img`).src = render.author.avatar;
  element.querySelector(`img`).alt = render.offer.title;

  return element;
};

const activatePins = function () {
  const mapFragment = document.createDocumentFragment();
  const pinsBase = getRandomPins();
  for (let i = 0; i < pinsBase.length; i++) {
    let pin = renderElement(pinsBase[i]);
    onClickPin(pin, pinsBase[i]); // Обработчик кликов на пин
    mapFragment.appendChild(pin);
    mapList.appendChild(mapFragment);
  }
};

const onClickPin = function (pin, base) {
  pin.addEventListener(`click`, function () {
    if (map.querySelector(`.popup`)) {
      closePopup();
      makeCard(base);
    } else {
      makeCard(base);
    }
  });
};

const makeCard = function (pinPopup) {
  const card = getPinCard(pinPopup);
  const delButton = card.querySelector(`.popup__close`);
  map.insertBefore(pinPopupFragment.appendChild(card), mapFilter);
  delButton.addEventListener(`click`, closePopup);
  document.addEventListener(`keydown`, opPopuPressEsc);
};


const closePopup = function () {
  map.querySelector(`.popup`).remove();
  document.removeEventListener(`keydown`, opPopuPressEsc);
};

const opPopuPressEsc = function (evt) {
  if (evt.key === `Escape`) {
    closePopup();
  }
};

const getPinCard = function (element) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(`.popup__avatar`).src = element.author.avatar;
  card.querySelector(`.popup__title`).textContent = element.offer.title;
  card.querySelector(`.popup__text--address`).textContent = element.offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${element.offer.price} ₽/ночь`;
  card.querySelector(`.popup__text--capacity`).textContent = `${element.offer.rooms} комнаты для ${element.offer.guests}`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  card.querySelector(`.popup__type`).textContent = TYPE_HOTEL[element.offer.type].name;
  const featuresList = card.querySelector(`.popup__features`);
  featuresList.innerHTML = ``;

  if (element.offer.features.length === 0) {
    card.removeChild(featuresList);
  }

  for (let i = 0; i < element.offer.features.length; i++) {
    const featuresItem = document.createElement(`li`);
    featuresItem.classList.add(`popup__feature`, `popup__feature--${element.offer.features[i]}`);
    featuresList.appendChild(featuresItem);
  }

  card.querySelector(`.popup__description`).textContent = element.offer.description;
  const photoList = card.querySelector(`.popup__photos`);
  const photoItem = photoList.querySelector(`.popup__photo`);

  if (element.offer.photos.length === 0) {
    card.removeChild(photoList);
  }

  for (let j = 0; j < element.offer.photos.length; j++) {
    const item = photoItem.cloneNode(true);
    item.src = element.offer.photos[j];
    photoList.appendChild(item);
  }
  photoList.removeChild(photoItem);

  return card;
};


// ------------------------------Валидация формы (Гости и комнаты) старт

const makeAd = function (evt) {
  evt.target.setCustomValidity(``);
  evt.target.style.boxShadow = ``;

  if (evt.target.matches(`#capacity`) || evt.target.matches(`#room_number`)) {
    rooms.setCustomValidity(``);
    rooms.style.boxShadow = ``;
    capacity.setCustomValidity(``);
    capacity.style.boxShadow = ``;
    if (parseInt(rooms.value, 10) !== MAXROOMS && parseInt(capacity.value, 10) === NOTGUESTS
    || parseInt(rooms.value, 10) === MAXROOMS && parseInt(capacity.value, 10) !== NOTGUESTS) {
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
    adPrice.setAttribute(`placeholder`, `${TYPE_HOTEL[evt.target.value].minprice}`);
    adPrice.setAttribute(`min`, `${TYPE_HOTEL[evt.target.value].minprice}`);
  }

  if (evt.target.matches(`#price`)) {
    if (evt.target.value < TYPE_HOTEL[adType.value].minprice) {
      evt.target.setCustomValidity(`Минимальная цена, для данного типа жилья ${TYPE_HOTEL[adType.value].minprice} руб`);
      evt.target.style.boxShadow = INPUT_SHADOW;
    }
  }

  if (evt.target.matches('#timein')) {
    adTimeout.value = adTimein.value;
  }
  if (evt.target.matches('#timeout')) {
    adTimein.value = adTimeout.value;
  }

  evt.target.reportValidity();
};
adForm.addEventListener(`input`, makeAd);

// ---------------------------------Валидация формы (Гости и комнаты) Конец
