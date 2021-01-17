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
  profileAvatarBtn,
  formAvatarElement,
  formAvatarBtnAdd,
  formProfileBtnAdd,
  formCardBtnAdd,
} from '../utils/constants.js';

const editProfileFormValidation = new FormValidator(validationConfig, formProfileElement);
const editCardFormValidation = new FormValidator(validationConfig, formCardElement);
const editAvatarFormValidation = new FormValidator(validationConfig, formAvatarElement);
const popupImage = new PopupWithImage('.popup-image');
const userInfo = new UserInfo();
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '528df5a2-16f1-4f0e-9003-28f33571e107',
    'Content-Type': 'application/json'
  }
})

/*
const deleteCardProfile = new PopupWithForm('.popup-delete-card', () => {
  api.deleteCard(card.getId())
    .then(() => card.removeCard())
    .catch(err => console.log('Ошибка при удалении'))
  deleteCardProfile.close();
});*/

// загружаем имя и описание пользователя ====================================
api.douwnloadUserInfo()
  .then(result => {
    userInfo.setUserInfo(result.name, result.about);
    profileAvatar.src = result.avatar;
    const userId = result._id;


    // функция создания карточки с учетом id пользователя =====================================
    const createCard = (data) => {
      const card = new Card(data, '.card-template',
        // handleCardClick
        (place, link) => {
          popupImage.open(place, link);
        },
        // handleTrashCardClick, для каждой карточки при нажатии на корзину будет создаваться экземпляр класса PopupWithForm для ее удаления
        () => {
          const deleteCardPopup = new PopupWithForm('.popup-delete-card', () => {
            // колбэк при согласии на удаление
            api.deleteCard(card.getId())
              .then(() => card.removeCard())
              .catch(err => console.log('Ошибка при удалении'))
            deleteCardPopup.removeListener();
            deleteCardPopup.close();
          });
          deleteCardPopup.open();
          deleteCardPopup.setEventListeners();
        }, userId
      );
      // передача кобэков для реализации лайков
      return card.generateCard(() => {
        api.checkLike(card.getId())
          .then(result => {
            card.checkLike(result)
          })
          .catch(err => console.log('Ошибка при реализации лайка', err));
      }, () => {
        api.disLike(card.getId())
          .then(result => {
            card.disLike(result)
          })
          .catch(err => console.log('Ошибка при реализации лайка', err));
      });
    }

    //  отрисовка карточек ==========================================
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
      .catch(err => console.log('Ошибка при создании карточек', err));


    // настройка формы карточек =========================
    const cardProfile = new PopupWithForm('.popup-card', (inputValues) => {
      const newItem = {}
      newItem.name = inputValues.popupInputPlace;
      newItem.link = inputValues.popupInputLink;
      formCardBtnAdd.textContent = 'Сохранить...'
      api.addCard(newItem)
        .then(result => {
          cardsList.addItem(createCard({ ...newItem, _id: result._id, likes: [] }));
          formCardBtnAdd.textContent = 'Сохранить'
        })
        .catch(err => console.log('Ошибка при создании карточки', err));
      cardProfile.close();
    });

    cardProfile.setEventListeners();

    openPopupCardBtn.addEventListener('click', function () {
      editCardFormValidation.cleanPopupInputError();
      cardProfile.open();
    })
  })


// настройка формы профайла
const profilePopup = new PopupWithForm('.popup-profile', (inputValues) => {
  formProfileBtnAdd.textContent = 'Сохранить...'
  api.patchUserInfo(inputValues.popupInputName, inputValues.popupInputJob)
    .then(result => {
      userInfo.setUserInfo(result.name, result.about);
      formProfileBtnAdd.textContent = 'Сохранить'
    })
    .catch(err => console.log('Ошибка при сохраненни информации', err));
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


// настройка формы аватара
const avatarPopup = new PopupWithForm('.popup-avatar', (inputValues) => {
  formAvatarBtnAdd.textContent = 'Да...'
  api.patchUserAvatar(inputValues.avatarInputLink)
    .then(result => {
      profileAvatar.src = result.avatar;
      formAvatarBtnAdd.textContent = 'Да'
    })
    .catch(err => console.log('Ошибка при сохраненни аватара', err));
  avatarPopup.close();
});

profileAvatarBtn.addEventListener('click', function () {
  avatarPopup.open()
})


// Закрытие по оверлею и кнопке ==================================================
// deleteCardProfile.setEventListeners();
popupImage.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();

// установка валидации форм ================================
editProfileFormValidation.enableValidation();
editCardFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();

