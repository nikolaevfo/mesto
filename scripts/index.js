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


// Находим форму в DOM
let formElement = document.querySelector('.popup__input'); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Находим поля формы в DOM
  let nameInput = document.querySelector('.popup__text_type_name'); // Воспользуйтесь инструментом .querySelector()
  let jobInput = document.querySelector('.popup__text_type_profession'); // Воспользуйтесь инструментом .querySelector()

  // Получите значение полей из свойства value
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let name = document.querySelector('.profile__title');
  let job = document.querySelector('.profile__subtitle');

  // Вставьте новые значения с помощью textContent
  name.textContent = `${nameValue}`;
  job.textContent = `${jobValue}`;

  closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 