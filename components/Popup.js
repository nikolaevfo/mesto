export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement = document.querySelector(this._popupSelector);

    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    // console.log('listener')
    // console.log(this)
    // this.setEventListeners()
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
    console.log(this)
    console.log('close listener')
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      console.log(this)
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement = document.querySelector(this._popupSelector);
    this._popupElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__button-cross')) {
        this.close();
      }
    })
  }
} 