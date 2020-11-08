// PopupProfile
let popupProfile = document.querySelector('.popup-profile');
let openPopupProfileBtn = document.querySelector('.profile__edit-button');
let closePopupProfileBtn = document.querySelector('.popup-profile__button-cross');
let formProfileElement = document.querySelector('.popup-profile__input');
let nameInput = document.querySelector('.popup-profile__text_type_name');
let jobInput = document.querySelector('.popup-profile__text_type_profession');
let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

// PopupCard
let popupCard = document.querySelector('.popup-card');
let openPopupCardBtn = document.querySelector('.profile__add-button');
let closePopupCardBtn = document.querySelector('.popup-card__button-cross');
let formCardElement = document.querySelector('.popup-card__input');
let placeInput = document.querySelector('.popup-card__text_type_place');
let linkInput = document.querySelector('.popup-card__text_type_link');

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

// Лайк карточек
const likeButton = document.querySelectorAll('.card__like');

// PopupImage
let popupImage = document.querySelector('.popup-image');
let popupImageLink = popupImage.querySelector('.popup-image__img');
let popupImagePlace = popupImage.querySelector('.popup-image__title');

let closePopupImageBtn = document.querySelector('.popup-image__button-cross');


//  Функуции ===================================================================================

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

// PopupCard
function openCardPopup() {
  popupCard.classList.add('popup_opened');
}

function closeCardPopup() {
  popupCard.classList.remove('popup_opened');
}

function formCardSubmitHandler(evt) {
  evt.preventDefault();
  let placeValue = placeInput.value;
  let linkValue = linkInput.value;

  const cardNewElement = cardTemplate.cloneNode(true);
  cardNewElement.querySelector('.card__title').textContent = `${placeValue}`;
  cardNewElement.querySelector('.card__img').src = `${linkValue}`;

  cardsContainer.prepend(cardNewElement);
  deleteCard();
  openImagePopup()
  closeCardPopup();
}

// Удаление карточек
function deleteCard() {
  const deleteButton = document.querySelectorAll('.card__trash');
  deleteButton.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      const deleteItem = eventTarget.closest('.card');
      deleteItem.remove();
    })
  })
}

// PopupImage
function closeImagePopup() {
  popupImage.classList.remove('popup-image_opened');
}

// Открытие PopupImage по клику
function openImagePopup() {
  const imageButton = document.querySelectorAll('.card__img');
  imageButton.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      const eventTarget = evt.target;
      const clickedCard = eventTarget.closest('.card');
      const clickedCardLink = clickedCard.querySelector('.card__img');
      const clickedCardPlace = clickedCard.querySelector('.card__title');

      popupImageLink.src = clickedCardLink.src;
      popupImagePlace.textContent = clickedCardPlace.textContent;
      console.log(popupImageLink);

      popupImage.classList.add('popup-image_opened');
    })
  })
}



// Реализация лайка по клику =================================================================
likeButton.forEach(function (item) {
  item.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
  })
})

// 
openPopupProfileBtn.addEventListener('click', openProfilePopup);
closePopupProfileBtn.addEventListener('click', closeProfilePopup);
formProfileElement.addEventListener('submit', formProfileSubmitHandler);

openPopupCardBtn.addEventListener('click', openCardPopup);
closePopupCardBtn.addEventListener('click', closeCardPopup);
formCardElement.addEventListener('submit', formCardSubmitHandler);

closePopupImageBtn.addEventListener('click', closeImagePopup);

deleteCard();
openImagePopup()