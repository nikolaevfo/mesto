import './index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  // initialCards,
  openPopupProfileBtn,
  openPopupCardBtn,
  nameInput,
  jobInput,
  validationConfig,
  formProfileElement,
  formCardElement,
} from '../utils/constants.js';

const editProfileFormValidation = new FormValidator(validationConfig, formProfileElement);
const editCardFormValidation = new FormValidator(validationConfig, formCardElement);
const popupImage = new PopupWithImage('.popup-image');
const userInfo = new UserInfo();


popupImage.setEventListeners();

//  отрисовка карточек
const cardsList = new Section(
  (item) => {
    const card = new Card(item, '.card-template', (name, link) => {
      popupImage.open(name, link);
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
  '.elements'
);

fetch('https://mesto.nomoreparties.co/v1/cohort-19/cards', {
  headers: {
    authorization: '528df5a2-16f1-4f0e-9003-28f33571e107'
  }
})
  .then(res => res.json())
  .then((result) => {
    cardsList.renderItems(result);
  });



// настройка формы профайла
const profilePopup = new PopupWithForm('.popup-profile', () => {
  userInfo.setUserInfo(nameInput.value, jobInput.value);
  profilePopup.close();
});

profilePopup.setEventListeners();

openPopupProfileBtn.addEventListener('click', function () {
  const UserData = userInfo.getUserInfo()
  nameInput.value = UserData.name;
  jobInput.value = UserData.job;
  editProfileFormValidation.setPopupSubmitBtnAbled();
  editProfileFormValidation.cleanPopupInputError();
  profilePopup.open();
})


// настройка формы карточек
const cardProfile = new PopupWithForm('.popup-card', (inputValues) => {
  const newItem = {}
  newItem.place = inputValues.popupInputPlace;
  newItem.link = inputValues.popupInputLink;

  const cardNew = new Card(newItem, '.card-template', (place, link) => {
    popupImage.open(place, link);
  });
  const cardNewElement = cardNew.generateCard();
  cardsList.addItem(cardNewElement);
  cardProfile.close();
});

cardProfile.setEventListeners();

openPopupCardBtn.addEventListener('click', function () {
  editCardFormValidation.cleanPopupInputError();
  cardProfile.open();
})


// установка валидации форм ================================
editProfileFormValidation.enableValidation();
editCardFormValidation.enableValidation();

// устанавливаем имя и описание ====================================
userInfo.douwnloadUserInfo();