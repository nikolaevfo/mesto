export default class Card {

  constructor(data, cardSelector, handleCardClick, handleTrashCardClick, userId) {
    this._place = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashCardClick = handleTrashCardClick;
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
    const _cardTrash = this._element.querySelector('.card__trash');
    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._place;
    _cardImg.src = this._link;
    _cardImg.alt = this._place;
    _cardLikesQuantity.textContent = this._likes.length;
    // проверка количества лайков
    if (this._likes.length === 0) {
      _cardLikesQuantity.classList.add('card__like-quantity_hidden')
    }
    // проверка, создана ли карточка нами
    if (this._owner._id !== this._userId) {
      _cardTrash.classList.add('card__trash_hidden')
    }
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._likeCard(evt);
    });
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._handleTrashCardClick();
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
