import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // собираем данные всей формы
    this._inputValues = {};
    inputValues.place = placeInput.value;
    inputValues.link = linkInput.value;
    inputValues.name = nameInput.value;
    inputValues.job = jobInput.value;

    return _inputValues
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement = document.querySelector(this._popupSelector);
    this._getInputValues();
    // дабавляет обработчик сабмита, передать полученные данные в разметку
    this._popupElement.addEventListener('submit', () => {
      this._handleFormSubmit(this._inputValues);
    })
  }

  close() {
    // необходимо сбросить форму
    super.close();
    this._popupElement.querySelector('.popup__form').reset();
  }

}