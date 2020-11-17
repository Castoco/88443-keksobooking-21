'use strict';

(function () {
  // ----------------------- Создаю карточку !

  const mapFilter = window.main.map.querySelector(`.map__filters-container`);
  const pinPopupFragment = document.createDocumentFragment();
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);


  const makeOffer = function (pinPopup) {
    const card = getPinCard(pinPopup);
    const delButton = card.querySelector(`.popup__close`);
    window.main.map.insertBefore(pinPopupFragment.appendChild(card), mapFilter);
    delButton.addEventListener(`click`, window.main.closePopup);
    document.addEventListener(`keydown`, window.main.onPopupPressEsc);
  };


  const getPinCard = function (element) {
    const card = cardTemplate.cloneNode(true);
    card.querySelector(`.popup__avatar`).src = element.author.avatar;
    card.querySelector(`.popup__title`).textContent = element.offer.title;
    card.querySelector(`.popup__text--address`).textContent = element.offer.address;
    card.querySelector(`.popup__text--price`).textContent = `${element.offer.price} ₽/ночь`;
    card.querySelector(`.popup__text--capacity`).textContent = `${element.offer.rooms} комнаты для ${element.offer.guests}`;
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
    card.querySelector(`.popup__type`).textContent = window.data.TYPE_HOTEL[element.offer.type].name;
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

  // -------------------------- Экспорт

  window.card = {
    makeOffer
  };


}());
