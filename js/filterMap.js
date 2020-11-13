'use strict';
(function () {
  const mapFilters = document.querySelector(`.map__filters`);
  let pins = [];
  let pinType = mapFilters.querySelector(`#housing-type`);
  let typePin = `any`;

  const successHandler = function (data) {
    pins = data;
    updatePins();
  };

  const updateData = function () {
    typePin = pinType.value;
    updatePins();
    window.main.closePopup();
  };

  const updatePins = function () {
    const someType = pins.filter(function (element) {
      if (typePin === `any`) {
        return element;
      } else {
        return element.offer.type === typePin;
      }
    });

    window.data.renderPins(someType);
  };

  mapFilters.addEventListener(`change`, updateData);

  window.filterMap = {
    successHandler
  };
}());
