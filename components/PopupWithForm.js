import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const placeInput = document.querySelector('.popup-card__text_type_place');
    const linkInput = document.querySelector('.popup-card__text_type_link');
    const _inputValues = {};
    _inputValues.place = placeInput.value;
    _inputValues.link = linkInput.value;


    return _inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement = document.querySelector(this._popupSelector);
    this._getInputValues();
    this._popupElement.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt);
    })
  }

  close() {
    super.close();
    this._popupElement.querySelector('.popup__form').reset();
  }

}