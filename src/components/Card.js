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
    this._element = this._getTemplate();
    this._cardLikesQuantity = this._element.querySelector('.card__like-quantity');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  generateCard(likeCB, disLikeCB) {
    const _cardImg = this._element.querySelector('.card__img');
    const _cardTrash = this._element.querySelector('.card__trash');
    const _cardLike = this._element.querySelector('.card__like');
    this._setEventListeners(likeCB, disLikeCB);
    this._element.querySelector('.card__title').textContent = this._place;
    _cardImg.src = this._link;
    _cardImg.alt = this._place;
    this._cardLikesQuantity.textContent = this._likes.length;

    // проверка количества лайков
    if (this._likes.length === 0) {
      this._cardLikesQuantity.classList.add('card__like-quantity_hidden')
    }

    // проверка, создана ли карточка нами
    if ((this._owner) && this._owner._id !== this._userId) {
      _cardTrash.classList.add('card__trash_hidden')
    }

    // проверка, лайкали ли мы уже карточку
    this._likes.forEach(element => {
      if (element._id === this._userId) {
        _cardLike.classList.add('card__like_active')
      }
    });
    this._element.id = this._id;

    return this._element;
  }

  _setEventListeners(likeCB, disLikeCB) {
    this._element.querySelector('.card__like').addEventListener('click', (evt) => {
      this._likeCard(evt, likeCB, disLikeCB);
    });
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._handleTrashCardClick();
    });
    // открывание попапа картинки
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._handleCardClick(this._place, this._link);
    });
  }

  _likeCard(evt, likeCB, disLikeCB) {
    evt.target.classList.toggle('card__like_active');
    if (evt.target.classList.contains('card__like_active')) {
      likeCB();
    } else {
      disLikeCB();
    }
  }

  // _deleteCard() {
  //   const _deleteItem = this._element.querySelector('.card__trash').closest('.card');
  //   _deleteItem.remove();
  // }

  getId() {
    return this._id;
  }

  // removeCard() {
  //   this._element.remove();
  //   this._element = null;
  // }

  addLike(response) {
    this._cardLikesQuantity.textContent = response.likes.length;
    this._cardLikesQuantity.classList.remove('card__like-quantity_hidden');

  }

  disLike(response) {
    this._cardLikesQuantity.textContent = response.likes.length;
    if (this._cardLikesQuantity.textContent == 0) {
      this._cardLikesQuantity.classList.add('card__like-quantity_hidden')
    }
  }
};
