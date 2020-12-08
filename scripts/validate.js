class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
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
      this._disableButton(button, this._config.buttonInvalidClass)
    }
  }

  _disableButton(btn, classAdd) {
    btn.classList.add(classAdd);
    btn.disabled = true;
  }

  _setEventListeners() {

    const _inputList = this._form.querySelectorAll(this._config.inputSelector);
    const _submitButton = this._form.querySelector(this._config.submitButtonSelector);

    _inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._isInputValid(input);
        this._toggleButtonState(_submitButton, this._form.checkValidity())
      })
    })
  }

  enableValidation() {

    if (this._form.classList.contains('popup-card__form')) {
      const _submitButtonCard = this._form.querySelector('.popup-card__btn-add');
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._disableButton(_submitButtonCard, this._config.buttonInvalidClass);
      });

      // для первого открывания попапа Card
      this._disableButton(_submitButtonCard, this._config.buttonInvalidClass);
    }

    this._setEventListeners();
  }
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-add',
  buttonInvalidClass: 'popup__btn-add_invalid',
  inputErrorClass: 'popup__text_state_invalid'
}

const forms = document.querySelectorAll('.popup__form');
forms.forEach((form) => {
  const formNew = new FormValidator(validationConfig, form);
  formNew.enableValidation();
});

/*
function showInputError(form, input, config) {
  const formError = form.querySelector(`#${input.id}-error`);
  formError.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
}

function hideInputError(form, input, config) {
  const formError = form.querySelector(`#${input.id}-error`);
  formError.textContent = '';
  input.classList.remove(config.inputErrorClass);
}

function isInputValid(form, input, config) {
  if (input.validity.valid) {
    hideInputError(form, input, config);
  } else {
    showInputError(form, input, config);
  }
}

function disableButton(btn, classAdd) {
  btn.classList.add(classAdd);
  btn.disabled = true;
}

function toggleButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.buttonInvalidClass);
    button.disabled = false;
  } else {
    disableButton(button, config.buttonInvalidClass)
  }
}

function setEventListeners(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isInputValid(form, input, config);
      toggleButtonState(submitButton, form.checkValidity(), config)
    })
  })
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    const submitButtonCard = document.querySelector('.popup-card__btn-add');

    setEventListeners(form, config);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      disableButton(submitButtonCard, config.buttonInvalidClass);
    });

    // для первого открывания попапа Card
    disableButton(submitButtonCard, config.buttonInvalidClass);
  });

}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-add',
  buttonInvalidClass: 'popup__btn-add_invalid',
  inputErrorClass: 'popup__text_state_invalid'
}

enableValidation(validationConfig);*/