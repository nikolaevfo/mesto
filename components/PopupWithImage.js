import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(cardSelector) {
    super(cardSelector);
  }

  open() {
    this._popupElement = document.querySelector(this._popupSelector);
    super.open();

    const _popupImage = document.querySelector('.popup-image');
    const _popupImageLink = _popupImage.querySelector('.popup-image__img');
    const _popupImagePlace = _popupImage.querySelector('.popup-image__title');
    const _clickedCardLink = _popupElement.querySelector('.card__img');
    const _clickedCardPlace = _popupElement.querySelector('.card__title');

    _popupImageLink.src = _clickedCardLink.src;
    _popupImagePlace.textContent = _clickedCardPlace.textContent;
  }
}