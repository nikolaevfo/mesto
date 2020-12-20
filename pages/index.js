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

} from '../utils/constants.js';


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {

    const card = new Card(item, '.card-template', (element) => {
      const popupImage = new PopupWithImage('.popup-image', element);
      popupImage.open()
    });
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  },
},
  '.elements'
);

cardsList.renderItems();



openPopupProfileBtn.addEventListener('click', function () {

  // выводим текущие значения профайла
  const userInfo = new UserInfo({ nameInput, jobInput });
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;

  const profilePopup = new PopupWithForm('.popup-profile', (evt) => {
    evt.preventDefault();
    const userInfo = new UserInfo({ nameInput, jobInput });
    userInfo.setUserInfo();
    profilePopup.close();
  });

  profilePopup.open();
});


openPopupCardBtn.addEventListener('click', function () {
  // formCardElement.reset();
  // editCardFormValidation.cleanPopupInputError();

  const profileCard = new PopupWithForm('.popup-card', (evt) => {
    evt.preventDefault();

    const newItem = {}
    newItem.place = profileCard._getInputValues().place;
    newItem.link = profileCard._getInputValues().link;
    console.log(newItem)

    const cardNew = new Section({
      items: [newItem],
      renderer: (item) => {

        const card = new Card(item, '.card-template', (element) => {
          const popupImage = new PopupWithImage('.popup-image', element);
          popupImage.open()
        });
        const cardElement = card.generateCard();

        cardsList.addItem(cardElement);
      },
    },
      '.elements'
    );
    cardNew.renderItems();
    profileCard.close();
  });


  profileCard.open();
});

// установка валидации форм ================================
forms.forEach((form) => {
  const formNew = new FormValidator(validationConfig, form);
  formNew.enableValidation();
});

