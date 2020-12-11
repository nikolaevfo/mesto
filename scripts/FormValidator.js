export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._submitButtonCard = this._form.querySelector('.popup-card__btn-add');
  }

  _showInputError(input) {
    const _formError = this._form.querySelector(`#${input.id}-error`);
    _formError.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(input) {
    const _formError = this._form.querySelector(`#${input.id}-error`);
    _formError.textContent = '';
    input.classList.remove(this._config.inputErrorClass);
  }

  _isInputValid(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _toggleButtonState(button, isActive) {
    if (isActive) {
      button.classList.remove(this._config.buttonInvalidClass);
      button.disabled = false;
    } else {
      this._disableButton(button)
    }
  }

  _disableButton(btn) {
    btn.classList.add(this._config.buttonInvalidClass);
    btn.disabled = true;
  }

  _setEventListeners() {

    const _inputList = this._form.querySelectorAll(this._config.inputSelector);

    _inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isInputValid(input);
        this._toggleButtonState(this._submitButton, this._form.checkValidity())
      })
    })
  }

  enableValidation() {

    if (this._form.classList.contains('popup-card__form')) {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._disableButton(this._submitButtonCard, this._config.buttonInvalidClass);
      });

      // для первого открывания попапа Card
      this._disableButton(this._submitButtonCard, this._config.buttonInvalidClass);
    }

    this._setEventListeners();
  }
}