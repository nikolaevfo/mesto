export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupElement = document.querySelector(this._popupSelector);

    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose());
    this.setEventListeners()
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOverlayEsc)
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-cross')) {
        this.close();
      }
    })
  }
} 