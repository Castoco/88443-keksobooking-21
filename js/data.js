'use strict';
(function () {

  const PIN_WIDTH_SCALE = 25;
  const PIN_SCALE = 70;
  const MAP_WIDTH = 1200;
  const MAP_TOP_Y = 130;
  const MAP_BOTTOM_Y = 630;
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
  const PINS_COUNT = 5;
  const mapList = window.main.map.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  const renderElement = (render) => { // -----Функция отрисовки пинов
    const element = pinTemplate.cloneNode(true);
    element.style = `left: ${render.location.x - PIN_WIDTH_SCALE}px; top: ${render.location.y - PIN_SCALE}px;`;
    element.querySelector(`img`).src = render.author.avatar;
    element.querySelector(`img`).alt = render.offer.title;

    return element;
  };

  const renderPins = (pinsBase) => {
    const pins = mapList.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    const mapFragment = document.createDocumentFragment();

    pins.forEach((pin) => {
      pin.remove();
    });

    pinsBase.forEach((pinElement) => {
      let pin = renderElement(pinElement);
      window.main.onClickPin(pin, pinElement); // Обработчик кликов на пин
      mapFragment.appendChild(pin);
      mapList.appendChild(mapFragment);
    });
  };

  window.data = {
    TYPE_HOTEL,
    renderElement,
    MAP_WIDTH,
    MAP_TOP_Y,
    MAP_BOTTOM_Y,
    renderPins,
    PINS_COUNT
  };

}());
