import "./index.css";

import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
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
} from "../utils/constants.js";

const editProfileFormValidation = new FormValidator(
  validationConfig,
  formProfileElement
);
const editCardFormValidation = new FormValidator(
  validationConfig,
  formCardElement
);
const editAvatarFormValidation = new FormValidator(
  validationConfig,
  formAvatarElement
);
const popupImage = new PopupWithImage(".popup-image");
const userInfo = new UserInfo();
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "528df5a2-16f1-4f0e-9003-28f33571e107",
    "Content-Type": "application/json",
  },
});

let removeCardId = "";
const deleteCardPopup = new PopupWithForm(".popup-delete-card", () => {
  api
    .deleteCard(removeCardId)
    .then(() => {
      let deletedElement = document.getElementById(removeCardId);
      deletedElement.remove();
      deletedElement = null;
      deleteCardPopup.close();
    })
    .catch((err) => console.log("Ошибка при удалении", err));
});
deleteCardPopup.setEventListeners();

// функция создания карточки с учетом id пользователя =====================================
const createCard = (data, userId) => {
  const card = new Card(
    data,
    ".card-template",
    // handleCardClick
    (place, link) => {
      popupImage.open(place, link);
    },
    // handleTrashCardClick =========================================
    () => {
      deleteCardPopup.open();
      removeCardId = card.getId();
    },
    userId
  );
  // передача кобэков для реализации лайков
  return card.generateCard(
    () => {
      api
        .addLike(card.getId())
        .then((result) => {
          card.addLike(result);
        })
        .catch((err) => console.log("Ошибка при реализации лайка", err));
    },
    () => {
      api
        .disLike(card.getId())
        .then((result) => {
          card.disLike(result);
        })
        .catch((err) => console.log("Ошибка при реализации лайка", err));
    }
  );
};

// загружаем имя, описание пользователя и карточки ====================================
Promise.all([api.douwnloadUserInfo(), api.getCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    profileAvatar.src = userData.avatar;
    const userId = userData._id;

    const cardsList = new Section((item) => {
      cardsList.addItem(createCard(item, userId));
    }, ".elements");
    cardsList.renderItems(initialCards);

    // настройка формы карточек =========================
    const cardProfile = new PopupWithForm(".popup-card", (inputValues) => {
      const newItem = {};
      newItem.name = inputValues.popupInputPlace;
      newItem.link = inputValues.popupInputLink;
      formCardBtnAdd.textContent = "Сохранить...";
      api
        .addCard(newItem)
        .then((result) => {
          cardsList.addItem(
            createCard(
              { ...newItem, _id: result._id, likes: result.likes },
              userId
            )
          );
          formCardBtnAdd.textContent = "Сохранить";
          cardProfile.close();
        })
        .catch((err) => console.log("Ошибка при создании карточки", err));
    });

    cardProfile.setEventListeners();

    openPopupCardBtn.addEventListener("click", function () {
      editCardFormValidation.cleanPopupInputError();
      cardProfile.open();
    });
  })
  .catch((err) => console.log("Ошибка при загрузке", err));

// настройка формы профайла
const profilePopup = new PopupWithForm(".popup-profile", (inputValues) => {
  formProfileBtnAdd.textContent = "Сохранить...";
  api
    .patchUserInfo(inputValues.popupInputName, inputValues.popupInputJob)
    .then((result) => {
      userInfo.setUserInfo(result.name, result.about);
      formProfileBtnAdd.textContent = "Сохранить";
      profilePopup.close();
    })
    .catch((err) => console.log("Ошибка при сохраненни информации", err));
});

openPopupProfileBtn.addEventListener("click", function () {
  const UserData = userInfo.getUserInfo();
  nameInput.value = UserData.name;
  jobInput.value = UserData.job;
  editProfileFormValidation.setPopupSubmitBtnAbled();
  editProfileFormValidation.cleanPopupInputError();
  profilePopup.open();
});

// настройка формы аватара
const avatarPopup = new PopupWithForm(".popup-avatar", (inputValues) => {
  formAvatarBtnAdd.textContent = "Да...";
  api
    .patchUserAvatar(inputValues.avatarInputLink)
    .then((result) => {
      profileAvatar.src = result.avatar;
      formAvatarBtnAdd.textContent = "Да";
      avatarPopup.close();
    })
    .catch((err) => console.log("Ошибка при сохраненни аватара", err));
});

profileAvatarBtn.addEventListener("click", function () {
  avatarPopup.open();
});

// Закрытие по оверлею и кнопке ==================================================
popupImage.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();

// установка валидации форм ================================
editProfileFormValidation.enableValidation();
editCardFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();
