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
const closePopupProfileBtn = document.querySelector('.popup-profile__button-cross');
const formProfileElement = document.querySelector('.popup-profile__form');
const nameInput = document.querySelector('.popup-profile__text_type_name');
const jobInput = document.querySelector('.popup-profile__text_type_profession');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');

// PopupCard const
const popupCard = document.querySelector('.popup-card');
const openPopupCardBtn = document.querySelector('.profile__add-button');
const closePopupCardBtn = document.querySelector('.popup-card__button-cross');
const formCardElement = document.querySelector('.popup-card__form');
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


class Card {

  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }


  // static template = document.querySelector(this._cardSelector).content;
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    // this._element = Card.template.cloneNode(true);
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__img').src = this._link;

    return this._element;
  }

  _setEventListeners() {
    // console.log(this._element.querySelector('.card__like'))
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._openImagePopup();
    });
  }

  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _deleteCard() {
    const _deleteItem = this._element.querySelector('.card__trash').closest('.card');
    _deleteItem.remove();
  }

  _openImagePopup() {

    //  todo возможно не нужно искать ближайший кард, т.к. this._element уже карточка?
    const _clickedCard = this._element.querySelector('.card__img').closest('.card');
    const _clickedCardLink = _clickedCard.querySelector('.card__img');
    const _clickedCardPlace = _clickedCard.querySelector('.card__title');

    popupImageLink.src = _clickedCardLink.src;
    popupImagePlace.textContent = _clickedCardPlace.textContent;

    openPopup(popupImage);
  }

};


initialCards.forEach((item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();

  cardsContainer.prepend(cardElement);
});







function openPopup(popup) {
  const form = popup.querySelector('.popup__form');
  const inputList = popup.querySelectorAll('.popup__input');

  inputList.forEach((input) => {
    const formError = form.querySelector(`#${input.id}-error`);
    formError.textContent = '';
    input.classList.remove('popup__text_state_invalid');
  })

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOverlayEsc);
}


function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', _closeOverlayEsc)
}

function closeOverlayEsc(evt) {
  if (evt.key === 'Escape') {
    const _popupActive = document.querySelector('.popup_opened');
    this._closePopup(_popupActive);
  }
}



/*
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOverlayEsc)
}

function closeOverlayEsc(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  }
}*/

/*
function openPopup(popup) {
  const form = popup.querySelector('.popup__form');
  const inputList = popup.querySelectorAll('.popup__input');

  inputList.forEach((input) => {
    const formError = form.querySelector(`#${input.id}-error`);
    formError.textContent = '';
    input.classList.remove('popup__text_state_invalid');
  })

  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOverlayEsc);
}*/

/*
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
}*/

/*
function createCard(item) {
  const cardNewElement = cardTemplate.cloneNode(true);
  const cardNewElementTitle = cardNewElement.querySelector('.card__title');
  const cardNewElementImg = cardNewElement.querySelector('.card__img');
  const cardNewElementLike = cardNewElement.querySelector('.card__like');
  const cardNewElementTrash = cardNewElement.querySelector('.card__trash');

  cardNewElementTitle.textContent = item.name;
  cardNewElementImg.src = item.link;
  cardNewElementLike.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    likeCard(eventTarget);
  })
  cardNewElementTrash.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    deleteCard(eventTarget);
  })
  cardNewElementImg.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    openImagePopup(eventTarget);
  })

  return cardNewElement;
}*/
/*
function addCard(item, selector) {
  const _card = new Card(item, selector);
  const _addedElement = _card.generateCard();
  cardsContainer.prepend(_addedElement);
}

// Добавляем начальные карточки
initialCards.forEach(addCard, '.card-template');*/







// PopupProfile
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
  addCard(cardAddElement);
  closePopup(popupCard);
}


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