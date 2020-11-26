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

enableValidation(validationConfig);