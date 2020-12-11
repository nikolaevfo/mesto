export default class Card {

  constructor(data, cardSelector, cardClickHandler) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardClickHandler = cardClickHandler;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;

    return this._element;
  }

  _clickCard() {
    this._cardClickHandler(this._name, this._link);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._deleteCard();
    });
    this._element.querySelector('.card__img').addEventListener('click', () => this._clickCard());
  }

  _likeCard(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }
};
