// PopupProfile
const popupProfile = document.querySelector('.popup-profile');
const openPopupProfileBtn = document.querySelector('.profile__edit-button');
const closePopupProfileBtn = document.querySelector('.popup-profile__button-cross');
const formProfileElement = document.querySelector('.popup-profile__input');
const nameInput = document.querySelector('.popup-profile__text_type_name');
const jobInput = document.querySelector('.popup-profile__text_type_profession');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

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
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  name.textContent = `${nameValue}`;
  job.textContent = `${jobValue}`;
  closeProfilePopup()
}


// PopupCard
const popupCard = document.querySelector('.popup-card');
const openPopupCardBtn = document.querySelector('.profile__add-button');
const closePopupCardBtn = document.querySelector('.popup-card__button-cross');
const formCardElement = document.querySelector('.popup-card__input');
const placeInput = document.querySelector('.popup-card__text_type_place');
const linkInput = document.querySelector('.popup-card__text_type_link');

function openCardPopup() {
  popupCard.classList.add('popup_opened');
}

function closeCardPopup() {
  popupCard.classList.remove('popup_opened');
}


// Add cards
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


const popupImage = document.querySelector('.popup-image');
const popupImageLink = popupImage.querySelector('.popup-image__img');
const popupImagePlace = popupImage.querySelector('.popup-image__title');
const closePopupImageBtn = document.querySelector('.popup-image__button-cross');

function addCard(cardElement) {
  const cardNewElement = cardTemplate.cloneNode(true);

  cardNewElement.querySelector('.card__title').textContent = cardElement.name;
  cardNewElement.querySelector('.card__img').src = cardElement.link;

  cardNewElement.querySelector('.card__like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
  })

  cardNewElement.querySelector('.card__trash').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    const deleteItem = eventTarget.closest('.card');
    deleteItem.remove();
  })

  cardNewElement.querySelector('.card__img').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    const clickedCard = eventTarget.closest('.card');
    const clickedCardLink = clickedCard.querySelector('.card__img');
    const clickedCardPlace = clickedCard.querySelector('.card__title');

    popupImageLink.src = clickedCardLink.src;
    popupImagePlace.textContent = clickedCardPlace.textContent;

    popupImage.classList.add('popup-image_opened');
  })

  cardsContainer.prepend(cardNewElement);
}

// Добавляем начальные карточки
initialCards.forEach(addCard);

formCardElement.addEventListener('submit', evt => {
  evt.preventDefault();

  let cardAddElement = {};

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
openPopupProfileBtn.addEventListener('click', openProfilePopup);
closePopupProfileBtn.addEventListener('click', closeProfilePopup);
formProfileElement.addEventListener('submit', formProfileSubmitHandler);

openPopupCardBtn.addEventListener('click', openCardPopup);
closePopupCardBtn.addEventListener('click', closeCardPopup);

closePopupImageBtn.addEventListener('click', closeImagePopup);