export default class Card {

  constructor(data, cardSelector, handleCardClick) {
    this._place = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
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
    const _cardLikesQuantity = this._element.querySelector('.card__like-quantity');
    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._place;
    _cardImg.src = this._link;
    _cardImg.alt = this._place;
    _cardLikesQuantity.textContent = this._likes.length;
    if (this._likes.length === 0) {
      _cardLikesQuantity.classList.add('card__like-quantity_hidden')
    }
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
      this._handleCardClick(this._place, this._link);
    });
  }

  _likeCard(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _deleteCard() {
    const _deleteItem = this._element.querySelector('.card__trash').closest('.card');
    _deleteItem.remove();
  }

  getId() {
    return this._id;
  }
};
