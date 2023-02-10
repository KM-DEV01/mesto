export const container = document.querySelector('.page__container');
export const buttonEditProfile = container.querySelector('.profile__edit-button');
export const buttonAddCard = container.querySelector('.profile__add-button');
export const cardTemplate = '#card-template';


export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
}

//для классов
export const popupProfileSelector = '.popup_type_profile';
export const popupCardSelector = '.popup_type_card';
export const popupImageSelector = '.popup_type_picture';

export const profileFields = {
  name: '.profile__name',
  about: '.profile__caption',
}