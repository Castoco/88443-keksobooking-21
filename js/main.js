'use strict';

const PIN_WIDTH_SCALE = 25;
const PIN_SCALE = 70;
const PINS_QUANTITY = 8;
const TYPE_HOTEL = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало'};
const TITLE_WORDS = ['Номер', 'Хата', 'Дыра', 'Квартира'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const HOTEL_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const MAP_WIDTH = 1200;
const MAP_START_X = 25;
const MAP_TOP_Y = 130;
const MAP_BOTTOM_Y = 630;
const TIME_CHECKIN = 12;
const TIME_CHECKOUT = 14;
const MIN_PRICE = 100;
const MAX_PRICE = 999;
const ROOMS_MAX = 15;
const ROOMS_MIN = 1;
const GUESTS_MIN = 1;
const GUESTS_MAX = 15;
const TYPES = Object.keys(TYPE_HOTEL);

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

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

const pinsBase = getRandomPins();

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapList = document.querySelector(`.map__pins`);

const renderElement = function (render) {
  const element = pinTemplate.cloneNode(true);
  element.style = `left: ${render.location.x - PIN_WIDTH_SCALE}px; top: ${render.location.y - PIN_SCALE}px;`;
  element.querySelector('img').src = render.author.avatar;
  element.querySelector('img').alt = render.offer.title;

  return element;
};

const mapFragment = document.createDocumentFragment();

for (let i = 0; i < pinsBase.length; i++) {
  mapFragment.appendChild(renderElement(pinsBase[i]));
  mapList.appendChild(mapFragment);
}

const cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

const getPinCard = function (element) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__avatar').src = element.author.avatar;
  card.querySelector('.popup__title').textContent = element.offer.title;
  card.querySelector('.popup__text--address').textContent = element.offer.address;
  card.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  card.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests}`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  card.querySelector('.popup__type').textContent = TYPE_HOTEL[element.offer.type];
  const featuresList = card.querySelector('.popup__features');
  featuresList.innerHTML = '';

  if (element.offer.features.length === 0) {
    card.removeChild(featuresList);
  }

  for (let i = 0; i < element.offer.features.length; i++) {
    const featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature', `popup__feature--${element.offer.features[i]}`);
    featuresList.appendChild(featuresItem);
  }

  card.querySelector('.popup__description').textContent = element.offer.description;
  const photoList = card.querySelector('.popup__photos');
  const photoItem = photoList.querySelector('.popup__photo');

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

const mapFilter = map.querySelector('.map__filters-container');
const pinPopupFragment = document.createDocumentFragment();
const pinPopup = getPinCard(pinsBase[0]);
map.insertBefore(pinPopupFragment.appendChild(pinPopup), mapFilter);


