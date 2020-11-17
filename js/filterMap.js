'use strict';
(function () {
  const MIN_PRICE = 10000;
  const HIGH_PRICE = 50000;
  const MIN_ROOM = 0;
  const MAX_ROOM = 3;
  const NOT_GUESTS = 0;
  const MAX_GUESTS = 2;
  const mapFilters = document.querySelector(`.map__filters`);
  const pinType = mapFilters.querySelector(`#housing-type`);
  const pinPrice = mapFilters.querySelector(`#housing-price`);
  const pinRooms = mapFilters.querySelector(`#housing-rooms`);
  const pinGuests = mapFilters.querySelector(`#housing-guests`);
  const DEFAULT_STATUS = `any`;
  let pins = [];


  const successHandler = function (data) {
    pins = data;
    updatePins();
  };

  const updateData = function () {
    window.util.debounce(updatePins);
    window.main.closePopup();
  };

  const updatePins = function () {
    let status = {
      features: [],
      typePin: `any`,
      price: `any`,
      rooms: `any`,
      guests: `any`,
    };

    status.typePin = pinType.value;
    status.price = pinPrice.value;
    status.rooms = pinRooms.value;
    status.guests = pinGuests.value;
    status.features = Array.from(document.querySelectorAll(`.map__checkbox:checked`));

    let succsessPin = [];

    for (let i = 0; i < pins.length && succsessPin.length < window.data.PINS_COUNT; i++) {
      if (checkFilter(pins[i], status)) {
        succsessPin.push(pins[i]);
      }

    }
    window.data.renderPins(succsessPin);
  };

  mapFilters.addEventListener(`change`, updateData);

  const getFeatures = function (element, features) {
    let flag = true;
    for (let i = 0; i < features.length; i++) {
      if (!element.includes(features[i].value)) {
        flag = false;
      }
    }
    return flag;
  };

  const checkFilter = function (element, status) {
    let isType = true;
    let isPrice = true;
    let isRoom = true;
    let isGuests = true;
    let isFeatures = true;

    if (status.typePin !== DEFAULT_STATUS) {
      isType = element.offer.type === status.typePin;
    }
    if (status.price !== DEFAULT_STATUS) {
      isPrice = getPrices(element.offer.price) === status.price;
    }
    if (status.rooms !== DEFAULT_STATUS) {
      isRoom = getRooms(element.offer.rooms) === status.rooms;
    }
    if (status.guests !== DEFAULT_STATUS) {
      isGuests = getGuests(element.offer.guests) === status.guests;
    }
    if (status.features.length > 0) {
      isFeatures = getFeatures(element.offer.features, status.features);
    }
    return isType && isPrice && isRoom && isGuests && isFeatures;
  };

  const getPrices = function (value) {
    let cost = `any`;
    if (value >= MIN_PRICE || value <= HIGH_PRICE) {
      cost = `middle`;
    }
    if (value < MIN_PRICE) {
      cost = `low`;
    }
    if (value > HIGH_PRICE) {
      cost = `high`;
    }
    return cost;
  };

  const getRooms = function (value) {
    let offerRoom = String(value);
    if (value > MAX_ROOM || value <= MIN_ROOM) {
      offerRoom = `any`;
    }
    return offerRoom;
  };

  const getGuests = function (value) {
    let offerGuests = String(value);
    if (value > MAX_GUESTS || value < NOT_GUESTS) {
      offerGuests = `any`;
    }
    return offerGuests;
  };

  window.filterMap = {
    successHandler,
    mapFilters
  };
}());
