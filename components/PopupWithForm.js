import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const nameInput = document.querySelector('.popup-profile__text_type_name');
    const jobInput = document.querySelector('.popup-profile__text_type_profession');
    const placeInput = document.querySelector('.popup-card__text_type_place');
    const linkInput = document.querySelector('.popup-card__text_type_link');
    const _inputValues = {};
    _inputValues.place = placeInput.value;
    _inputValues.link = linkInput.value;
    _inputValues.name = nameInput.value;
    _inputValues.job = jobInput.value;

    return _inputValues;
  }

  setEventListeners() {

    super.setEventListeners();
    this._popupElement = document.querySelector(this._popupSelector);
    this._getInputValues();
    console.log(this._getInputValues())
    // дабавляет обработчик сабмита, передать полученные данные в разметку

    this._popupElement.addEventListener('submit', (evt) => {
      this._handleFormSubmit(evt);
    })
  }

  close() {
    // необходимо сбросить форму
    super.close();
    this._popupElement.querySelector('.popup__form').reset();
  }

}