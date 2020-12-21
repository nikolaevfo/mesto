export default class Card {

  constructor(data, cardSelector, handleCardClick) {
    this._place = data.place;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    const _cardImg = this._element.querySelector('.card__img');

    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._place;
    _cardImg.src = this._link;
    _cardImg.alt = this._place;
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._deleteCard();
    });
    // открывание попапа картинки
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick(this._element);
    });
  }

  _likeCard(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _deleteCard() {
    const _deleteItem = this._element.querySelector('.card__trash').closest('.card');
    _deleteItem.remove();
  }
};
