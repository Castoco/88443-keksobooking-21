'use strict';
(function () {

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

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // ------------------------------------ Создаю случайный пин, данные для карточки
  const randomPin = function (counter) {
    const pinLocationX = window.util.getRandomNumber(MAP_START_X, MAP_WIDTH);
    const pinLocationY = window.util.getRandomNumber(MAP_TOP_Y, MAP_BOTTOM_Y);
    const announcement =
    {
      'author': {
        'avatar': `img/avatars/user0${counter}.png`
      },
      'offer': {
        'title': `Это лучшая ${TITLE_WORDS[window.util.getRandomNumber(0, TITLE_WORDS.length - 1)]} во всем Токио!`,
        'address': `Адрес предложения ${pinLocationX}, ${pinLocationY}`,
        'price': window.util.getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': TYPES[window.util.getRandomNumber(0, TYPES.length - 1)],
        'rooms': window.util.getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        'guests': window.util.getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        'checkin': `${window.util.getRandomNumber(TIME_CHECKIN, TIME_CHECKOUT)}:00`,
        'checkout': `${window.util.getRandomNumber(TIME_CHECKIN, TIME_CHECKOUT)}:00`,
        'features': window.util.getStrRandom(FEATURES),
        'description': `В квартире есть все для комфортного проживания, СКИДКИ ОТ 3 ДНЕЙ И ПОСТОЯННЫМ КЛИЕНТАМ!!!`,
        'photos': window.util.getStrRandom(HOTEL_PHOTO)
      },
      'location': {
        'x': pinLocationX,
        'y': pinLocationY
      }
    }
  ;
    return announcement;
  };

  const getRandomPins = function () { // -----Сохраняю случайные пины и данные в обьект.
    const pins = [];
    for (let i = 1; i <= PINS_QUANTITY; i++) {
      pins.push(randomPin(i));
    }
    return pins;
  };

  const renderElement = function (render) { // -----Функция отрисовки пинов
    const element = pinTemplate.cloneNode(true);
    element.style = `left: ${render.location.x - PIN_WIDTH_SCALE}px; top: ${render.location.y - PIN_SCALE}px;`;
    element.querySelector(`img`).src = render.author.avatar;
    element.querySelector(`img`).alt = render.offer.title;

    return element;
  };

  window.data = {
    TYPE_HOTEL,
    getRandomPins,
    renderElement,
    MAP_WIDTH,
    MAP_TOP_Y,
    MAP_BOTTOM_Y
  };

}());
