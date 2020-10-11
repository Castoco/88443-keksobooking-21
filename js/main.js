'use strict';

const PIN_WIDTH = 50;
const PIN_SCALE = -70;
const PINS_QUANTITY = 8;
const TYPE_HOTEL = ['palace', 'flat', 'house', 'bungalow'];
const TITLE_WORDS = ['Номер', 'Хата', 'Дыра', 'Квартира'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOTEL_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const MAP_WIDTH = 900;
const MAP_START_X = 0;
const MAP_TOP_Y = 130;
const MAP_BOTTOM_Y = 620;
const TIME_CHECKIN = 12;
const TIME_CHECKOUT = 14;
const MIN_PRICE = 100;
const MAX_PRICE = 999;
const ROOMS_MAX = 15;
const ROOMS_MIN = 1;
const GUESTS_MIN = 1;
const GUESTS_MAX = 15;


const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

document.querySelector(`.map`).classList.remove(`map--faded`);

const getStrLength = function (arr) {
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
        'title': `Это лучшая(-ый) ${TITLE_WORDS[getRandomNumber(0, TITLE_WORDS.length)]} во всем Токио!`,
        'address': `Адрес предложения ${pinLocationX}, ${pinLocationY}`,
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': TYPE_HOTEL[getRandomNumber(0, TYPE_HOTEL.length)],
        'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        'checkin': `${getRandomNumber(TIME_CHECKIN, TIME_CHECKOUT)}:00`,
        'checkout': `${getRandomNumber(TIME_CHECKIN, TIME_CHECKOUT)}:00`,
        'features': getStrLength(FEATURES),
        'description': `В квартире есть все для комфортного проживания, СКИДКИ ОТ 3 ДНЕЙ И ПОСТОЯННЫМ КЛИЕНТАМ!!!`,
        'photos': getStrLength(HOTEL_PHOTO)
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

const pinsBase = getRandomPins();

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapList = document.querySelector(`.map`);

const renderElement = function (render) {
  let element = pinTemplate.cloneNode(true);
  element.style = `left: ${render.location.x + PIN_WIDTH}px; top: ${render.location.y + PIN_SCALE}px;`;
  element.querySelector('img').src = render.author.avatar;
  element.querySelector('img').alt = render.offer.title;

  return element;
};

const mapFragment = document.createDocumentFragment();

for (let i = 0; i < pinsBase.length; i++) {
  mapFragment.appendChild(renderElement(pinsBase[i]));
  mapList.appendChild(mapFragment);
}
