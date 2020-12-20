import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, element) {
    super(popupSelector);
    this._place = element.querySelector('.card__title');
    this._link = element.querySelector('.card__img');
  }

  open() {
    super.open();

    this._popupElement = document.querySelector(this._popupSelector);
    const _popupImage = document.querySelector('.popup-image');
    const _popupImageLink = _popupImage.querySelector('.popup-image__img');
    const _popupImagePlace = _popupImage.querySelector('.popup-image__title');

    _popupImageLink.src = this._link.src;
    _popupImagePlace.textContent = this._place.textContent;

  }
}