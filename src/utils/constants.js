const zueviImage = new URL('../images/zuevi-cluchi.jpg', import.meta.url);
const chegadinskieImage = new URL('../images/chegadinskie-pesheri.jpg', import.meta.url);
const hramImage = new URL('../images/hram.jpg', import.meta.url);
const muvirImage = new URL('../images/muvir.jpg', import.meta.url);
const corobeinikiImage = new URL('../images/prud-corobejniki.jpg', import.meta.url);
const sidoroviImage = new URL('../images/sidorovi-gori.jpg', import.meta.url);

export const initialCards = [
  {
    place: 'Зуевы Ключи',
    link: zueviImage
  },
  {
    place: 'Чегандинские пещеры',
    link: chegadinskieImage
  },
  {
    place: 'Заброшенный храм',
    link: hramImage
  },
  {
    place: 'Мувыр',
    link: muvirImage
  },
  {
    place: 'Пруд в Коробейниках',
    link: corobeinikiImage
  },
  {
    place: 'Сидоровы горы',
    link: sidoroviImage
  }
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-add',
  buttonInvalidClass: 'popup__btn-add_invalid',
  inputErrorClass: 'popup__text_state_invalid'
}

export const openPopupProfileBtn = document.querySelector('.profile__edit-button');
export const openPopupCardBtn = document.querySelector('.profile__add-button');
export const nameInput = document.querySelector('.popup-profile__text_type_name');
export const jobInput = document.querySelector('.popup-profile__text_type_profession');
export const forms = document.querySelectorAll('.popup__form');
export const formProfileElement = document.querySelector('.popup-profile__form');
export const formCardElement = document.querySelector('.popup-card__form');