'use strict';

(function () {
  const MAXROOMS = 100;
  const NOTGUESTS = 0;
  const INPUT_SHADOW = `0 0 2px 2px #ff0000`;
  const TITLE_LENGTH_MIN = 30;
  const TITLE_LENGTH_MAX = 100;

  const rooms = window.main.adForm.querySelector(`#room_number`);
  const capacity = window.main.adForm.querySelector(`#capacity`);
  const adPrice = window.main.adForm.querySelector(`#price`);
  const adType = window.main.adForm.querySelector(`#type`);
  const adTimein = window.main.adForm.querySelector('#timein');
  const adTimeout = window.main.adForm.querySelector('#timeout');

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
      adPrice.setAttribute(`placeholder`, `${window.data.TYPE_HOTEL[evt.target.value].minprice}`);
      adPrice.setAttribute(`min`, `${window.data.TYPE_HOTEL[evt.target.value].minprice}`);
    }

    if (evt.target.matches(`#price`) || evt.target.matches(`#type`)) {
      adPrice.setCustomValidity(``);
      adPrice.style.boxShadow = ``;
      if (adPrice.value < window.data.TYPE_HOTEL[adType.value].minprice) {
        evt.target.setCustomValidity(`Минимальная цена, для данного типа жилья ${window.data.TYPE_HOTEL[adType.value].minprice} руб`);
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

  window.main.adForm.addEventListener(`input`, makeAd);

})();
