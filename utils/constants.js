export const initialCards = [
  {
    place: 'Зуевы Ключи',
    link: './images/zuevi-cluchi.jpg'
  },
  {
    place: 'Чегандинские пещеры',
    link: './images/chegadinskie-pesheri.jpg'
  },
  {
    place: 'Заброшенный храм',
    link: './images/hram.jpg'
  },
  {
    place: 'Мувыр',
    link: './images/muvir.jpg'
  },
  {
    place: 'Пруд в Коробейниках',
    link: './images/prud-corobejniki.jpg'
  },
  {
    place: 'Сидоровы горы',
    link: './images/sidorovi-gori.jpg'
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