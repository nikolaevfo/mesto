import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageLink = this._popupElement.querySelector(
      ".popup-image__img"
    );
    this._popupImagePlace = this._popupElement.querySelector(
      ".popup-image__title"
    );
  }

  open(place, link) {
    this._popupImageLink.src = link;
    this._popupImageLink.alt = place;
    this._popupImagePlace.textContent = place;
    super.open();
  }
}
