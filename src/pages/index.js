import './index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  openPopupProfileBtn,
  openPopupCardBtn,
  nameInput,
  jobInput,
  forms,
  validationConfig,
  formProfileElement,
  formCardElement,

} from '../utils/constants.js';

const editProfileFormValidation = new FormValidator(validationConfig, formProfileElement);
const editCardFormValidation = new FormValidator(validationConfig, formCardElement);


//  отрисовка карточек
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template', (element) => {
      const popupImage = new PopupWithImage('.popup-image', element);
      popupImage.open();
      popupImage.setEventListeners();
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  },
},
  '.elements'
);
cardsList.renderItems();


// настройка формы профайла
const userInfo = new UserInfo({ nameInput, jobInput });
const profilePopup = new PopupWithForm('.popup-profile', (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo();
  profilePopup.close();
});

profilePopup.setEventListeners();

openPopupProfileBtn.addEventListener('click', function () {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editProfileFormValidation.setPopupSubmitBtnAbled();
  editProfileFormValidation.cleanPopupInputError();
  profilePopup.open();
})


// настройка формы карточек
const cardProfile = new PopupWithForm('.popup-card', (evt) => {
  evt.preventDefault();
  const newItem = {}
  newItem.place = cardProfile._getInputValues().place;
  newItem.link = cardProfile._getInputValues().link;
  const cardNew = new Section({
    items: [newItem],
    renderer: (item) => {
      const card = new Card(item, '.card-template', (element) => {
        const popupImage = new PopupWithImage('.popup-image', element);
        popupImage.open();
        popupImage.setEventListeners();
      });
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
    '.elements'
  );
  cardNew.renderItems();

  cardProfile.close();
});

cardProfile.setEventListeners();

openPopupCardBtn.addEventListener('click', function () {
  editCardFormValidation.cleanPopupInputError();
  cardProfile.open();
})


// установка валидации форм ================================
forms.forEach((form) => {
  const formNew = new FormValidator(validationConfig, form);
  formNew.enableValidation();
});

