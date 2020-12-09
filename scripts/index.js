import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

// PopupProfile const
const popupProfile = document.querySelector('.popup-profile');
const openPopupProfileBtn = document.querySelector('.profile__edit-button');
const formProfileElement = document.querySelector('.popup-profile__form');
const nameInput = document.querySelector('.popup-profile__text_type_name');
const jobInput = document.querySelector('.popup-profile__text_type_profession');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

// PopupCard const
const popupCard = document.querySelector('.popup-card');
const openPopupCardBtn = document.querySelector('.profile__add-button');
const formCardElement = document.querySelector('.popup-card__form');
const placeInput = document.querySelector('.popup-card__text_type_place');
const linkInput = document.querySelector('.popup-card__text_type_link');

// Add cards const
const cardsContainer = document.querySelector('.elements');

//  PopupImage const
const popupImage = document.querySelector('.popup-image');
const popupImageLink = popupImage.querySelector('.popup-image__img');
const popupImagePlace = popupImage.querySelector('.popup-image__title');


function createCard(item, selector) {
  const card = new Card(item, selector);
  const newElement = card.generateCard();
  return newElement;
}

function setListenerImagePopup(element) {
  element.querySelector('.card__img').addEventListener('click', () => {
    openImagePopup(element);
  });
}

function openImagePopup(element) {
  const clickedCardLink = element.querySelector('.card__img');
  const clickedCardPlace = element.querySelector('.card__title');

  popupImageLink.src = clickedCardLink.src;
  popupImagePlace.textContent = clickedCardPlace.textContent;

  openPopup(popupImage);
}

function addCard(item, selector) {
  const card = createCard(item, selector)
  setListenerImagePopup(card);
  cardsContainer.prepend(card);
}

function openPopup(popup) {
  const form = popup.querySelector('.popup__form');
  const inputList = popup.querySelectorAll('.popup__input');

  inputList.forEach((input) => {
    const formError = form.querySelector(`#${input.id}-error`);
    formError.textContent = '';
    input.classList.remove('popup__text_state_invalid');
  })

  popup.classList.add('popup_opened');

  if (popup.classList.contains('popup-profile')) {
    const submitButtonProfile = popup.querySelector('.popup-profile__btn-add')
    submitButtonProfile.disabled = false;
    submitButtonProfile.classList.remove(validationConfig.buttonInvalidClass);
  }

  document.addEventListener('keydown', closeOverlayEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOverlayEsc)
}

function closeOverlayEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}

function formProfileSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupProfile);
}

function formCardSubmitHandler(evt) {
  evt.preventDefault();
  const cardAddElement = {};
  cardAddElement.name = placeInput.value;
  cardAddElement.link = linkInput.value;

  addCard(cardAddElement, '.card-template');
  closePopup(popupCard);
}


// Добавление начальных карточек
initialCards.forEach((item) => {
  addCard(item, '.card-template')
});

// ======================================================================================
openPopupProfileBtn.addEventListener('click', function () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  openPopup(popupProfile);
});
formProfileElement.addEventListener('submit', formProfileSubmitHandler);


openPopupCardBtn.addEventListener('click', function () {
  formCardElement.reset();
  openPopup(popupCard);
});
formCardElement.addEventListener('submit', formCardSubmitHandler);

// закрытие всех popup по клику на крестик и оверлею
const popupList = document.querySelectorAll('.popup');
popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-cross')) {
      closePopup(popup);
    }
  })
})


// ================================================================

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-add',
  buttonInvalidClass: 'popup__btn-add_invalid',
  inputErrorClass: 'popup__text_state_invalid'
}

const forms = document.querySelectorAll('.popup__form');
forms.forEach((form) => {
  const formNew = new FormValidator(validationConfig, form);
  formNew.enableValidation();
});

