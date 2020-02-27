"use strict";

(function () {
  const TypesMap = {
    PALACE: "Дворец",
    FLAT: "Квартира",
    HOUSE: "Дом",
    BUNGALO: "Бунгало"
  };

  const map = document.querySelector('.map');
  const mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  const card = mapCardTemplate.cloneNode(true);

  function successHandler(ads) {
    window.pin.renderPins(ads);
    window.filters.addFilters(ads);
  }

  function addFeatures(ad) {
    card.querySelector('.popup__features').innerHTML = '';
    const featuresFragment = document.createDocumentFragment();
    const featureElement = document.createElement('li');
    featureElement.classList.add("popup__feature");
    for (let i = 0; i < ad.offer.features.length; i++) {
      const newFeature = featureElement.cloneNode(true);
      newFeature.classList.add(`popup__feature--${ad.offer.features[i]}`);
      featuresFragment.append(newFeature);
    }
    card.querySelector('.popup__features').append(featuresFragment);
  }

  function addPhotos(ad) {
    card.querySelector('.popup__photos').innerHTML = '';
    const picturesFragment = document.createDocumentFragment();
    const imageElement = document.createElement("img");
    imageElement.classList.add('popup__photo');
    for (let i = 0; i < ad.offer.photos.length; i++) {
      const photo = imageElement.cloneNode(true);
      photo.src = `${ad.offer.photos[i]}`;
      photo.width = 45;
      photo.height = 40;
      picturesFragment.append(photo);
    }
    card.querySelector('.popup__photos').append(picturesFragment);
  }

  function createCard(ad) {
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = `${window.utils.numberWithCommas(ad.offer.price)}₽/ночь`;
    card.querySelector('.popup__type').textContent = TypesMap[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    card.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    addFeatures(ad);
    card.querySelector('.popup__description').textContent = ad.offer.description;
    addPhotos(ad);
    card.querySelector('.popup__avatar').src = ad.author.avatar;
    return card;
  }

  function renderCard(ad) {
    const fragment = document.createDocumentFragment();
    const card = createCard(ad);
    fragment.append(card);
    map.append(fragment);
    const closeButton = map.querySelector('.popup__close');
    closeButton.tabIndex = 0;
    closeButton.addEventListener('click', deleteCard);
    document.addEventListener('keydown', escPressHandler);
  }

  function escPressHandler() {
    if (window.utils.isEscEvent) {
      deleteCard();
    }
  }

  function deleteCard() {
    let card = map.querySelector('.popup');
    const closeButton = map.querySelector('.popup__close');
    if (card) {
      card.remove();
      closeButton.removeEventListener('click', deleteCard);
      document.removeEventListener('keydown', escPressHandler);
    }
  }


  window.map = {
    successHandler: successHandler,
    renderCard: renderCard,
    map: map,
    deleteCard: deleteCard
  }

})();