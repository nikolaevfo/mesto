export default class Card {

  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _deleteCard() {
    const _deleteItem = this._element.querySelector('.card__trash').closest('.card');
    _deleteItem.remove();
  }
};
