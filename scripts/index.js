let popup = document.querySelector('.popup');
let openPopupBtn = document.querySelector('.profile__edit-button');
let closePopupBtn = document.querySelector('.popup__button-cross');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

let formElement = document.querySelector('.popup__input'); // Воспользуйтесь методом querySelector()

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.popup__text_type_name'); // Воспользуйтесь инструментом .querySelector()
  let jobInput = document.querySelector('.popup__text_type_profession'); // Воспользуйтесь инструментом .querySelector()

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  let name = document.querySelector('.profile__title');
  let job = document.querySelector('.profile__subtitle');

  name.textContent = `${nameValue}`;
  job.textContent = `${jobValue}`;

  closePopup()
}

formElement.addEventListener('submit', formSubmitHandler); 