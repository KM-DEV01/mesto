import { initialCards } from './cards.js';
import { Card } from './Сard.js';
import { FormValidator } from './Validate.js';

const container = document.querySelector('.page__container');
const buttonEditProfile = container.querySelector('.profile__edit-button');
const profileName = container.querySelector('.profile__name');
const profileCaption = container.querySelector('.profile__caption');
const buttonAddCard = container.querySelector('.profile__add-button');
const cardContainer = container.querySelector('.card__list');
const popupList = Array.from(container.querySelectorAll('.popup'));
const cardTemplate = '#card-template';
const popupFormList = Array.from(container.querySelectorAll('.popup__form'));

//Попап профиля
const popupProfile = container.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfileForm.elements['name'];
const popupProfileProperty = popupProfileForm.elements['caption'];

// Попап карточек
const popupCard = container.querySelector('.popup_type_card');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupImageTitle = popupCardForm.elements['image-name'];
const popupImageLink = popupCardForm.elements['url'];

const validationConfig = {
  // formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  // activeButtonClass: 'popup__save-button_valid',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
}
//Включение валидации
popupFormList.forEach(element => {
  const formValidate = new FormValidator(validationConfig, element)
  formValidate.enableValidation()
});

//Функции кнопок на попапе
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addKeyListener();
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function savePopup(onSaveFunc, popup) {
  onSaveFunc();
  closePopup(popup);
}

// функции заполнения полей профиля
function fillPopupFields() {
  popupProfileName.value = profileName.textContent;
  popupProfileProperty.value = profileCaption.textContent;
}
function saveProfileChanges () {
  profileName.textContent = popupProfileName.value;
  profileCaption.textContent = popupProfileProperty.value;
}

buttonEditProfile.addEventListener('click', () => {
  fillPopupFields();
  openPopup(popupProfile);
});

buttonAddCard.addEventListener('click', () => {
  popupImageTitle.value = '';
  popupImageLink.value = '';

  const submitButton = popupCard.querySelector('.popup__save-button');

  submitButton.classList.add(validationConfig.inactiveButtonClass);
  submitButton.disabled = true;

  openPopup(popupCard);
});

popupProfileForm.addEventListener('submit', event => {
  event.preventDefault();
  savePopup(saveProfileChanges, popupProfile)
});

popupCardForm.addEventListener('submit', event => {
  event.preventDefault();
  savePopup(addNewCard, popupCard);
});

// Добавить карточки изображений
initialCards.forEach(item => {
  const card = new Card(item, cardTemplate);
  const cardElement = card.generateCard();

  cardElement.addEventListener('click', addKeyListener)

  cardContainer.append(cardElement);
});

function addNewCard() {
  const popupCard = {};
  popupCard.name = popupImageTitle.value;
  popupCard.alt = `Место: ${popupImageTitle.value}`;
  popupCard.link = popupImageLink.value;

  const card = new Card(popupCard, cardTemplate);
  const cardElement = card.generateCard();

  cardContainer.prepend(cardElement);
}

//закрыть попап при нажатии на оверлей или на кнопку закрыть
popupList.forEach(popup => {
  popup.addEventListener('click', event => {
    const targetClassList = event.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

//Обработчики esc
function addKeyListener() {
  document.addEventListener('keydown', addKeyHandler);
}
function removeKeydownListener() {
  document.removeEventListener('keydown', addKeyHandler);
}
function addKeyHandler(event) {
  const popup = container.querySelector('.popup_opened')
  if (event.key === 'Escape'){
    closePopup(popup);
    removeKeydownListener();
  }
}
