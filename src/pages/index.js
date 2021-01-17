import './index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  openPopupProfileBtn,
  openPopupCardBtn,
  nameInput,
  jobInput,
  validationConfig,
  formProfileElement,
  formCardElement,
  profileAvatar,
} from '../utils/constants.js';

const editProfileFormValidation = new FormValidator(validationConfig, formProfileElement);
const editCardFormValidation = new FormValidator(validationConfig, formCardElement);
const popupImage = new PopupWithImage('.popup-image');
const userInfo = new UserInfo();
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '528df5a2-16f1-4f0e-9003-28f33571e107',
    'Content-Type': 'application/json'
  }
})


const deleteCardProfile = new PopupWithForm('.popup-delete-card', () => {
  deleteCardProfile.close();
});

// устанавливаем имя и описание ====================================
api.douwnloadUserInfo()
  .then(result => {
    userInfo.setUserInfo(result.name, result.about);
    profileAvatar.src = result.avatar;
    const userId = result._id;


    // функция создания карточки =====================================
    const createCard = (data) => {
      const card = new Card(data, '.card-template', (place, link) => {
        popupImage.open(place, link);
      }, () => {
        deleteCardProfile.open();
      }, userId
      );
      return card.generateCard();
    }

    //  отрисовка карточек =======================================================
    const cardsList = new Section(
      (item) => {
        cardsList.addItem(createCard(item));
      },
      '.elements'
    );

    api.getCards()
      .then(result => {
        cardsList.renderItems(result)
      })


    // настройка формы карточек =========================
    const cardProfile = new PopupWithForm('.popup-card', (inputValues) => {
      const newItem = {}
      newItem.name = inputValues.popupInputPlace;
      newItem.link = inputValues.popupInputLink;
      api.addCard(newItem)
        .then(result => {
          cardsList.addItem(createCard({ ...newItem, _id: result.id, likes: [] }))
        })
        .catch(err => console.log('Ошибка при создании карточки', err))
      cardProfile.close();
    });

    cardProfile.setEventListeners();

    openPopupCardBtn.addEventListener('click', function () {
      editCardFormValidation.cleanPopupInputError();
      cardProfile.open();
    })

  })


// настройка формы профайла
const profilePopup = new PopupWithForm('.popup-profile', () => {
  api.patchUserInfo(nameInput.value, jobInput.value)
    .then(result => {
      userInfo.setUserInfo(result.name, result.about)
    });
  profilePopup.close();
});



openPopupProfileBtn.addEventListener('click', function () {
  const UserData = userInfo.getUserInfo()
  nameInput.value = UserData.name;
  jobInput.value = UserData.job;
  editProfileFormValidation.setPopupSubmitBtnAbled();
  editProfileFormValidation.cleanPopupInputError();
  profilePopup.open();
})


// Закрытие по оверлею и кнопке ==================================================
deleteCardProfile.setEventListeners();
popupImage.setEventListeners();
profilePopup.setEventListeners();

// установка валидации форм ================================
editProfileFormValidation.enableValidation();
editCardFormValidation.enableValidation();

