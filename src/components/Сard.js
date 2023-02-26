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
    this._cardOwnerId = data.owner._id;
    this._name = data.name;
    this._alt = `Место: ${data.name}`;
    this._link = data.link;
    this._likes = data.likes
    this._likesCount = data.likes ? data.likes.length : 0;
    this._cardId = data._id;
    this._userId = userId;

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

    this._cardTemplate.dataset.id = this._cardId;
    this._cardTemplate.dataset.owner_id = this._cardOwnerId;
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._alt;
    this._cardImage.src = this._link;
    this._cardLikes.textContent = this._likesCount;

    if (!(this._userId === this._cardOwnerId)) {
      this._cardDeleteButton.remove();
    }
    if(this._isMyLike()){
      this._cardLikeButton.classList.add('card__like-button_active');
    }

    this._setEventListeners();

    return this._cardTemplate;
  }

  _isMyLike() {
    return this._likes.some(element => element._id === this._userId);
  }

  _updateLikesCount = (data) => {
    this._likes = data.likes;
    this._cardLikes.textContent = data.likes.length;
  }

  _handleLikeImage(event) {
    const cardId = event.target.closest('.card__item').dataset.id;
    if(this._isMyLike()){
      this._handleLikeButtonClick(cardId, 'DELETE', this._updateLikesCount);
    } else {
      this._handleLikeButtonClick(cardId, 'PUT', this._updateLikesCount);
    }
    event.target.classList.toggle('card__like-button_active');
  }

  _handleDeleteImage(event) {
    return event.target.closest('.card__item');
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._data));
    this._cardLikeButton.addEventListener('click', (evt) => {
      return this._handleLikeImage(evt)
    });
    this._cardDeleteButton.addEventListener('click', (evt) => {
      return this._handleDeleteButtonClick(this._handleDeleteImage(evt))
    });
  }
}