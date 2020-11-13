'use strict';
(function () {
  const mapFilters = document.querySelector(`.map__filters`);
  let pins = [];
  const pinType = mapFilters.querySelector(`#housing-type`);
  const pinPrice = mapFilters.querySelector(`#housing-price`);
  const pinRooms = mapFilters.querySelector(`#housing-rooms`);
  const pinGuests = mapFilters.querySelector(`#housing-guests`);
  let features = `any`;

  let typePin = `any`;
  let price = `any`;
  let rooms = `any`;
  let guests = `any`;

  const successHandler = function (data) {
    pins = data;
    updatePins();
  };

  const updateData = function () {
    typePin = pinType.value;
    price = pinPrice.value;
    rooms = pinRooms.value;
    guests = pinGuests.value;
    features = Array.from(document.querySelectorAll(`.map__checkbox:checked`));
    updatePins();
    window.main.closePopup();
  };

  const updatePins = function () {

    const someType = pins.filter(function (element) {
      let isType = true;
      let isPrice = true;
      let isRoom = true;
      let isGuests = true;
      let isFeatures = true;

      if (typePin !== `any`) {
        isType = element.offer.type === typePin;
      }

      if (price !== `any`) {
        isPrice = getPrices(element.offer.price) === price;
      }

      if (rooms !== `any`) {
        isRoom = getRooms(element.offer.rooms) === rooms;
      }

      if (guests !== `any`) {
        isGuests = getGuests(element.offer.guests) === guests;
      }

      if (features !== `any`) {
        isFeatures = element.offer.features === getFeatures(features);
        console.log(getFeatures(features));
        console.log(element.offer.features);
      }


      return isType && isPrice && isRoom && isGuests && isFeatures;
    });
    window.data.renderPins(someType);
  };

  mapFilters.addEventListener(`change`, updateData);

  const getFeatures = function (arr) {
    let featureValue = [];
    for (let i = 0; i < arr.length; i++) {
      featureValue.push(arr[i].value);
    }

    return featureValue;
  };

  const getPrices = function (value) {
    let cost = `any`;
    if (value >= 10000 || value <= 50000) {
      cost = `middle`;
    }
    if (value < 10000) {
      cost = `low`;
    }
    if (value > 50000) {
      cost = `high`;
    }
    return cost;
  };

  const getRooms = function (value) {
    let offerRoom = String(value);
    if (value > 3 || value <= 0) {
      offerRoom = `any`;
    }
    return offerRoom;
  };

  const getGuests = function (value) {
    let offerGuests = String(value);
    if (value > 2 || value < 0) {
      offerGuests = `any`;
    }
    return offerGuests;
  };

  window.filterMap = {
    successHandler
  };
}());
