// import { openPopup, closeOverlayEsc, closePopup } from './index.js'

export default class Card {

  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__img').src = this._link;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._deleteCard();
    });
    // this._element.querySelector('.card__img').addEventListener('click', () => {
    //   this._openImagePopup();
    // });
  }

  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _deleteCard() {
    const _deleteItem = this._element.querySelector('.card__trash').closest('.card');
    _deleteItem.remove();
  }

  /*
  _openImagePopup() {
    const _clickedCardLink = this._element.querySelector('.card__img');
    const _clickedCardPlace = this._element.querySelector('.card__title');
    const _popupImage = document.querySelector('.popup-image');
    const _popupImageLink = _popupImage.querySelector('.popup-image__img');
    const _popupImagePlace = _popupImage.querySelector('.popup-image__title');

    _popupImageLink.src = _clickedCardLink.src;
    _popupImagePlace.textContent = _clickedCardPlace.textContent;

    openPopup(_popupImage);
  }*/

};
