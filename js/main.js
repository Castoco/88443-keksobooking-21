'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = -70;
const PINS_QUANTITY = 8;
const TYPE_HOTEL = ['palace', 'flat', 'house', 'bungalow'];
const TITLE_WORDS = ['Номер', 'Хата', 'Дыра', 'Квартира'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOTEL_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

document.querySelector(`.map`).classList.remove(`map--faded`);

const getStrLength = function (arr) {
  let randomStr;
  for (let i = 0; i < arr.length - 1; i++) {
    randomStr = arr.slice(0, getRandomNumber(0, arr.length - 1));
  }
  return randomStr;
};

const randomPin = function () {
  const pinLocationX = getRandomNumber(0, 900);
  const pinLocationY = getRandomNumber(130, 620);
  const announcement =
    {
      'author': {
        'avatar': `img/avatars/user0${getRandomNumber(1, 8)}.png`
      },
      'offer': {
        'title': `Это лучшая(-ый) ${TITLE_WORDS[getRandomNumber(0, 3)]} во всем Токио!`,
        'address': `Адрес предложения ${pinLocationX}, ${pinLocationY}`,
        'price': getRandomNumber(100, 999),
        'type': TYPE_HOTEL[getRandomNumber(0, 3)],
        'rooms': getRandomNumber(1, 15),
        'guests': getRandomNumber(1, 8),
        'checkin': `1${getRandomNumber(2, 4)}:00`,
        'checkout': `1${getRandomNumber(2, 4)}:00`,
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
  for (let i = 0; i < PINS_QUANTITY; i++) {
    pins.push(randomPin());
  }
  return pins;
};

const pinsBase = getRandomPins();

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapList = document.querySelector(`.map`);

const renderElement = function (render) {
  let element = pinTemplate.cloneNode(true);
  element.style = `left: ${render.location.x + PIN_WIDTH}px; top: ${render.location.y + PIN_HEIGHT}px;`;
  element.querySelector('img').src = render.author.avatar;
  element.querySelector('img').alt = render.offer.title;

  return element;
};

const mapFragment = document.createDocumentFragment();

for (let i = 0; i < pinsBase.length - 1; i++) {
  mapFragment.appendChild(renderElement(pinsBase[i]));
  mapList.appendChild(mapFragment);
}
