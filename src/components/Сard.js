export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteButtonClick,
    handleLikeButtonClick,
    userId
  ) {
    this._data = data;
    this._userId = userId;
    this._likesCount = data.likes ? data.likes.length : 0;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card__item')
      .cloneNode(true);
  }

  generateCard() {
    this._cardTemplate = this._getTemplate();
    this._cardName = this._cardTemplate.querySelector('.card__name');
    this._cardImage = this._cardTemplate.querySelector('.card__image');
    this._cardLikes = this._cardTemplate.querySelector('.card__likes');
    this._cardLikeButton = this._cardTemplate.querySelector('.card__like-button');
    this._cardDeleteButton = this._cardTemplate.querySelector('.card__delete-button');

    this._cardName.textContent = this._data.name;
    this._cardImage.alt = `Место: ${this._data.name}`;
    this._cardImage.src = this._data.link;
    this._cardLikes.textContent = this._likesCount;

    if (!(this._userId === this._data.owner._id)) {
      this._cardDeleteButton.remove();
      this._cardDeleteButton = null;
    }

    if(this._isMyLike()){
      this._cardLikeButton.classList.add('card__like-button_active');
    }

    this._setEventListeners();
    return this._cardTemplate;
  }

  _isMyLike() {
    return this._data.likes.some(element => element._id === this._userId);
  }

  updateLikes(data) {
    this._data = data
    this._cardLikes.textContent = data.likes.length;
    this._cardLikeButton.classList.toggle('card__like-button_active');
  }

  _handleLikeImage() {
    if(this._isMyLike()){
      this._handleLikeButtonClick(this, 'DELETE');
    } else {
      this._handleLikeButtonClick(this, 'PUT');
    }
  }

  removeCard() {
    this._cardTemplate.remove();
  }

  getCardId() {
    return this._data._id
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    });
    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeImage();
    });
    if(this._cardDeleteButton){
      this._cardDeleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick(this);
      });
    }
  }
}