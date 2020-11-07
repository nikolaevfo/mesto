// PopupProfile
let popupProfile = document.querySelector('.popup-profile');
let openPopupProfileBtn = document.querySelector('.profile__edit-button');
let closePopupProfileBtn = document.querySelector('.popup-profile__button-cross');
let formProfileElement = document.querySelector('.popup-profile__input');
let nameInput = document.querySelector('.popup-profile__text_type_name');
let jobInput = document.querySelector('.popup-profile__text_type_profession');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

// PopupImage
let popupImage = document.querySelector('.popup-image');
let openPopupImageBtn = document.querySelector('.profile__add-button');
let closePopupImageBtn = document.querySelector('.popup-image__button-cross');
let formImageElement = document.querySelector('.popup-image__input');
let placeInput = document.querySelector('.popup-image__text_type_place');
let linkInput = document.querySelector('.popup-image__text_type_link');

// Загрузка карточек
const initialCards = [
  {
    name: 'Зуевы Ключи',
    link: './images/zuevi-cluchi.jpg'
  },
  {
    name: 'Чегандинские пещеры',
    link: './images/chegadinskie-pesheri.jpg'
  },
  {
    name: 'Заброшенный храм',
    link: './images/hram.jpg'
  },
  {
    name: 'Мувыр',
    link: './images/muvir.jpg'
  },
  {
    name: 'Пруд в Коробейниках',
    link: './images/prud-corobejniki.jpg'
  },
  {
    name: 'Сидоровы горы',
    link: './images/sidorovi-gori.jpg'
  }
];
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.elements');
const cardElements = initialCards.map(function (item) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__img').src = item.link;
  return cardElement
})

cardsContainer.append(...cardElements);

// PopupProfile
function openProfilePopup() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popupProfile.classList.add('popup_opened');
}

function closeProfilePopup() {
  popupProfile.classList.remove('popup_opened');
}

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  name.textContent = `${nameValue}`;
  job.textContent = `${jobValue}`;
  closeProfilePopup()
}

// PopupImage

function openImagePopup() {
  popupImage.classList.add('popup_opened');
}

function closeImagePopup() {
  popupImage.classList.remove('popup_opened');
}

function formImageSubmitHandler(evt) {
  evt.preventDefault();
  let placeValue = placeInput.value;
  let linkValue = linkInput.value;
  // let cardNewElement = {};
  // cardNewElement.name = `${placeValue}`;
  // cardNewElement.link = `${linkValue}`;

  const cardNewElement = cardTemplate.cloneNode(true);
  cardNewElement.querySelector('.card__title').textContent = `${placeValue}`;
  cardNewElement.querySelector('.card__img').src = `${linkValue}`;

  cardsContainer.append(cardNewElement);

  closeImagePopup()
}

openPopupProfileBtn.addEventListener('click', openProfilePopup);
closePopupProfileBtn.addEventListener('click', closeProfilePopup);
formProfileElement.addEventListener('submit', formProfileSubmitHandler);

openPopupImageBtn.addEventListener('click', openImagePopup);
closePopupImageBtn.addEventListener('click', closeImagePopup);
formImageElement.addEventListener('submit', formImageSubmitHandler);