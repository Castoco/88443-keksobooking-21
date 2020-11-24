'use strict';
const FILE_TYPES = [`image/jpg`, `image/jpeg`, `image/png`, `image/gif`, `image/png`];
const adForm = window.moving.adForm;
const avatarChooser = adForm.querySelector(`.ad-form__field input[type=file]`);
const photoChooser = adForm.querySelector(`.ad-form__upload input[type=file]`);
const photo = adForm.querySelector(`.ad-form__photo`);
const avatar = adForm.querySelector(`.ad-form-header__preview img`);

avatarChooser.addEventListener(`change`, () => {
  getPreview(avatarChooser, avatar);
});

photoChooser.addEventListener(`change`, () => {
  createImage();
});

const createImage = () => {
  const image = document.createElement(`img`);
  image.style = `width: 40px; height: 44px; margin: 0 auto`;
  image.alt = `Фото жилья`;
  image.src = ` `;
  photo.appendChild(image);
  photo.style = `display: flex; align-items: center;`;
  const houseImage = adForm.querySelector(`.ad-form__photo img`);
  getPreview(photoChooser, houseImage);
};

const getPreview = (input, image) => {
  const file = input.files[0];
  const fileType = file.type;
  const matches = FILE_TYPES.some(function (it) {
    return fileType === it;
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      image.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};
