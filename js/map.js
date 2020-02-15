"use strict";

(function () {
  const map = document.querySelector('.map');
  const mapPins = document.querySelector('.map__pins');
  const mapPin = document.querySelector('.map__pin');
  const mapPinMain = document.querySelector('.map__pin--main');
  const mapOverlay = document.querySelector('.map__overlay');
  const adsArray = [];
  const mapCardTemplate = document.getElementById('card').content.querySelector('.map__card');
  const mapPinTemplate = document.getElementById('pin').content.querySelector('.map__pin');
  const card = mapCardTemplate.cloneNode(true);


  const titlesArray = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

  const typesArray = ["palace", "flat", "house", "bungalo"];
  const checkinsArray = ["12:00", "13:00", "14:00"];
  const checkoutsArray = ["12:00", "13:00", "14:00"];

  const featuresArray = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

  const photosArray = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];


  const TypesMap = {
    PALACE: "Дворец",
    FLAT: "Квартира",
    HOUSE: "Дом",
    BUNGALO: "Бунгало"
  };


  mapPinMain.addEventListener('mouseup', mouseUpHandler);
  mapPin.addEventListener('mousedown', mouseDownHandler);

  function mouseUpHandler() {
    map.classList.remove('map--faded');
  }

  function mouseDownHandler(e) {
    e.preventDefault();

    let startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    function mouseMoveHandler(e) {
      e.preventDefault();

      const shift = {
        x: startCoords.x - e.clientX,
        y: startCoords.y - e.clientY
      };

      startCoords = {
        x: e.clientX,
        y: e.clientY
      }

      mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';
    }

    function mouseUpHandler(e) {
      e.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }


  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateFeatures() {
    const features = [];
    const randLength = getRandomNum(1, featuresArray.length - 1);
    for (let i = 0; i < randLength; i++) {
      features.push(featuresArray[i]);
    }
    return features;
  }


  function generateAdsArray() {
    for (let i = 1; i <= 8; i++) {
      let locationX = getRandomNum(0, mapOverlay.offsetWidth);
      let locationY = getRandomNum(130, 630);
      const ad = {
        author: {
          avatar: `img/avatars/user0${i}.png`
        },
        offer: {
          title: titlesArray[i - 1],
          address: `${locationX}, ${locationY}`,
          price: getRandomNum(1000, 1000000),
          type: typesArray[getRandomNum(0, typesArray.length - 1)],
          rooms: getRandomNum(1, 5),
          guests: getRandomNum(1, 10),
          checkin: checkinsArray[0, checkinsArray.length - 1],
          checkout: checkoutsArray[0, checkoutsArray.length - 1],
          features: generateFeatures(),
          description: '',
          photos: photosArray.slice().sort(() => Math.random() - 0.5),
          location: {
            x: locationX,
            y: locationY
          }
        },
      };
      adsArray.push(ad);
    }
    return adsArray;
  }


  // const ads = generateAdsArray();

  function createPin(ad) {
    const pin = mapPinTemplate.cloneNode(true);
    const pinImage = pin.querySelector('img');
    pin.style.left = `${ad.offer.location.x + pinImage.offsetWidth / 2}px`;
    pin.style.top = `${ad.offer.location.y - pinImage.offsetHeight}px`;
    pinImage.src = `${ad.author.avatar}`;
    pinImage.alt = `Заголовок объявления`;
    return pin;
  }

  function renderPins() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 8; i++) {
      const pin = createPin(ads[i]);
      fragment.append(pin);
    }
    mapPins.append(fragment);
  }

  // renderPins();

  function addFeatures(ad) {
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
    card.querySelector('.popup__text--price').textContent = `${ad.offer.price}₽/ночь`;
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
    const card = createCard(ads[0]);
    console.log(ads[0]);
    console.log(card);
    fragment.append(card);
    map.append(fragment);
  }


  // renderCard();

})();