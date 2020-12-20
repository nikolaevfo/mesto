import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  initialCards,
  openPopupProfileBtn,

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
  const profilePopup = new PopupWithForm('.popup-profile',);

  profilePopup.open()

});