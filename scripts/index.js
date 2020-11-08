// PopupProfile
let popupProfile = document.querySelector('.popup-profile');
let openPopupProfileBtn = document.querySelector('.profile__edit-button');
let closePopupProfileBtn = document.querySelector('.popup-profile__button-cross');
let formProfileElement = document.querySelector('.popup-profile__input');
let nameInput = document.querySelector('.popup-profile__text_type_name');
let jobInput = document.querySelector('.popup-profile__text_type_profession');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

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


// PopupCard
let popupCard = document.querySelector('.popup-card');
let openPopupCardBtn = document.querySelector('.profile__add-button');
let closePopupCardBtn = document.querySelector('.popup-card__button-cross');
let formCardElement = document.querySelector('.popup-card__input');
let placeInput = document.querySelector('.popup-card__text_type_place');
let linkInput = document.querySelector('.popup-card__text_type_link');

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


let popupImage = document.querySelector('.popup-image');
let popupImageLink = popupImage.querySelector('.popup-image__img');
let popupImagePlace = popupImage.querySelector('.popup-image__title');
let closePopupImageBtn = document.querySelector('.popup-image__button-cross');

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
    console.log(deleteItem)
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