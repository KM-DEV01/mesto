export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._alt = `Место: ${data.name}`;
    this._link = data.link;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
   const cardElement = document
     .querySelector(this._templateSelector)
     .content
     .querySelector('.card__item')
     .cloneNode(true);
   return cardElement;
  }

  generateCard() {
    this._cardTemplate = this._getTemplate();

    this._cardName = this._cardTemplate.querySelector('.card__name');
    this._cardImage = this._cardTemplate.querySelector('.card__image');

    this._cardLikeButton = this._cardTemplate.querySelector('.card__like-button');
    this._cardDeleteButton = this._cardTemplate.querySelector('.card__delete-button');

    this._cardName.textContent = this._name;
    this._cardImage.alt = this._alt;
    this._cardImage.src = this._link;

    this._setEventListeners();

    return this._cardTemplate;
  }

  _handleLikeImage(event) {
    event.target.classList.toggle('card__like-button_active');
  }

  _handleDeleteImage(event) {
    event.target.closest('.card__item').remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });

    this._cardLikeButton.addEventListener('click', this._handleLikeImage);

    this._cardDeleteButton.addEventListener('click', this._handleDeleteImage);
  }
}