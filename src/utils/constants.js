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
export const profileAvatar = document.querySelector('.profile__avatar');