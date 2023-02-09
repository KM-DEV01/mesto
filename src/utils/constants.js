export const container = document.querySelector('.page__container');
export const buttonEditProfile = container.querySelector('.profile__edit-button');
// export const profileName = container.querySelector('.profile__name');
// export const profileCaption = container.querySelector('.profile__caption');
export const buttonAddCard = container.querySelector('.profile__add-button');
// export const cardContainer = container.querySelector('.card__list');
// export const popupList = Array.from(container.querySelectorAll('.popup'));
export const cardTemplate = '#card-template';

//Попап картинок
// export const popupPictureContainer = container.querySelector('.popup_type_picture');
// export const popupPicture = popupPictureContainer.querySelector('.popup__picture');
// export const popupPictureName = popupPictureContainer.querySelector('.popup__picture-name');

//Попап для изменения профиля
export const popupProfile = container.querySelector('.popup_type_profile');
export const popupProfileForm = popupProfile.querySelector('.popup__form');
export const popupProfileName = popupProfileForm.elements['name'];
export const popupProfileProperty = popupProfileForm.elements['caption'];

// Попап для добавления карточек
// export const popupCard = container.querySelector('.popup_type_card');
// export const popupCardForm = popupCard.querySelector('.popup__form');
// export const popupImageTitle = popupCardForm.elements['imageName'];
// export const popupImageLink = popupCardForm.elements['url'];


export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  // activeButtonClass: 'popup__save-button_valid',
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