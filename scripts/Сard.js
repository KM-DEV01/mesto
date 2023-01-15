const imagePopup = document.querySelector('.popup_type_picture');
const imagePopupPic = imagePopup.querySelector('.popup__picture');
const imagePopupName = imagePopup.querySelector('.popup__picture-name');

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._alt = `Место: ${data.name}`;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__image').alt = this._alt;
    this._element.querySelector('.card__image').src = this._link;

    return this._element;
  }

  _handleOpenPopup() {
    imagePopupPic.src = this._link;
    imagePopupPic.alt = `Место: ${this._name}`;
    imagePopupName.textContent = this._name;

    imagePopup.classList.add('popup_opened');
  }

  // _handleClosePopup() {
  //   imagePopupPic.src = '';
  //   imagePopupPic.alt = '';
  //   imagePopupName.textContent = '';
  //
  //   imagePopup.classList.remove('popup_opened');
  // }

  _handleLikeImage(event) {
    event.stopPropagation()
    event.target.classList.toggle('card__like-button_active');
  }

  _handleDeleteImage(event) {
    event.stopPropagation()
    event.target.closest('.card__item').remove();
  }


  _setEventListeners() {
    this._element.addEventListener('click', () => this._handleOpenPopup());

    this._element.querySelector('.card__like-button').addEventListener('click', this._handleLikeImage);

    this._element.querySelector('.card__delete-button').addEventListener('click', this._handleDeleteImage);
  }
}