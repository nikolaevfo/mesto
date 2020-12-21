import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector('.popup__form')
  }

  _getInputValues() {
    const _inputs = this._popupForm.querySelectorAll('.popup__input');
    const inputValues = {};
    _inputs.forEach((input) => {
      inputValues[input.name] = input.value
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement = document.querySelector(this._popupSelector);
    this._getInputValues();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}