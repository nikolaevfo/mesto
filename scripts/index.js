// Add cards data
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

// PopupProfile 
const popupProfile = document.querySelector('.popup-profile');
const openPopupProfileBtn = document.querySelector('.profile__edit-button');
const closePopupProfileBtn = document.querySelector('.popup-profile__button-cross');
const formProfileElement = document.querySelector('.popup-profile__input');
const nameInput = document.querySelector('.popup-profile__text_type_name');
const jobInput = document.querySelector('.popup-profile__text_type_profession');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

// PopupCard const
const popupCard = document.querySelector('.popup-card');
const openPopupCardBtn = document.querySelector('.profile__add-button');
const closePopupCardBtn = document.querySelector('.popup-card__button-cross');
const formCardElement = document.querySelector('.popup-card__input');
const placeInput = document.querySelector('.popup-card__text_type_place');
const linkInput = document.querySelector('.popup-card__text_type_link');

// Add cards const
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.elements');

//  PopupImage const
const popupImage = document.querySelector('.popup-image');
const popupImageLink = popupImage.querySelector('.popup-image__img');
const popupImagePlace = popupImage.querySelector('.popup-image__title');
const closePopupImageBtn = document.querySelector('.popup-image__button-cross');


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// PopupProfile
function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  name.textContent = `${nameValue}`;
  job.textContent = `${jobValue}`;
  closePopup(popupProfile);
}


function likeCard(item) {
  item.classList.toggle('card__like_active');
}

function deleteCard(item) {
  const deleteItem = item.closest('.card');
  deleteItem.remove();
}

function openImagePopup(item) {
  const clickedCard = item.closest('.card');
  const clickedCardLink = clickedCard.querySelector('.card__img');
  const clickedCardPlace = clickedCard.querySelector('.card__title');

  popupImageLink.src = clickedCardLink.src;
  popupImagePlace.textContent = clickedCardPlace.textContent;

  openPopup(popupImage);
}


//  PopupImage
function createCard(item) {
  const cardNewElement = cardTemplate.cloneNode(true);

  cardNewElement.querySelector('.card__title').textContent = item.name;
  cardNewElement.querySelector('.card__img').src = item.link;

  cardNewElement.querySelector('.card__like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    likeCard(eventTarget);
  })
  cardNewElement.querySelector('.card__trash').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    deleteCard(eventTarget);
  })
  cardNewElement.querySelector('.card__img').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    openImagePopup(eventTarget);
  })

  return cardNewElement;
}

function addCard(item) {
  const addedElement = createCard(item)
  cardsContainer.prepend(addedElement);
}

// Добавляем начальные карточки
initialCards.forEach(addCard);

formCardElement.addEventListener('submit', evt => {
  evt.preventDefault();

  const cardAddElement = {};

  cardAddElement.name = placeInput.value;
  cardAddElement.link = linkInput.value;

  addCard(cardAddElement);

  formCardElement.reset()

  closeCardPopup();
});

// PopupImage
function closeImagePopup() {
  popupImage.classList.remove('popup-image_opened');
}

// ======================================================================================
openPopupProfileBtn.addEventListener('click', function () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupProfile);
});
closePopupProfileBtn.addEventListener('click', function () {
  closePopup(popupProfile);
});
formProfileElement.addEventListener('submit', formProfileSubmitHandler);

openPopupCardBtn.addEventListener('click', openCardPopup);
closePopupCardBtn.addEventListener('click', closeCardPopup);

closePopupImageBtn.addEventListener('click', closeImagePopup);