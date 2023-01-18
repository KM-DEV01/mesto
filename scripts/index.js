import { initialCards } from './cards.js';
import { Card } from './Сard.js';
import { FormValidator } from './FormValidator.js';

const container = document.querySelector('.page__container');
const buttonEditProfile = container.querySelector('.profile__edit-button');
const profileName = container.querySelector('.profile__name');
const profileCaption = container.querySelector('.profile__caption');
const buttonAddCard = container.querySelector('.profile__add-button');
const cardContainer = container.querySelector('.card__list');
const popupList = Array.from(container.querySelectorAll('.popup'));
const cardTemplate = '#card-template';

//Попап картинок
const popupPictureContainer = container.querySelector('.popup_type_picture');
const popupPicture = popupPictureContainer.querySelector('.popup__picture');
const popupPictureName = popupPictureContainer.querySelector('.popup__picture-name');

//Попап для изменения профиля
const popupProfile = container.querySelector('.popup_type_profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfileForm.elements['name'];
const popupProfileProperty = popupProfileForm.elements['caption'];

// Попап для добавления карточек
const popupCard = container.querySelector('.popup_type_card');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupImageTitle = popupCardForm.elements['image-name'];
const popupImageLink = popupCardForm.elements['url'];

const formValidators = {}
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  // activeButtonClass: 'popup__save-button_valid',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
}

//Валидация
const enableValidator = (config) => {
 const formList = Array.from(document.querySelectorAll(config.formSelector));
 formList.forEach(formElement => {
   const validator = new FormValidator(config, formElement);
   //получение имени формы
   const formName = formElement.getAttribute('name');
   //запись экземпляра в объект formValidators в объект с именем формы
   formValidators[formName] = validator;
   //вызов метода enableValidation экземпляром класса
   validator.enableValidation();
 })
}
enableValidator(validationConfig);

//Функции кнопок на попапе
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addKeydownListener();
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeKeydownListener();
}
function savePopup(onSaveFunc, popup) {
  onSaveFunc();
  closePopup(popup);
}

// функции заполнения полей профиля
function fillProfileInputs() {
  popupProfileName.value = profileName.textContent;
  popupProfileProperty.value = profileCaption.textContent;
}
function saveProfileChanges () {
  profileName.textContent = popupProfileName.value;
  profileCaption.textContent = popupProfileProperty.value;
}

//Открыть попап редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  fillProfileInputs();
  //Сброс валидации с использованием метода класса
  formValidators['profileForm'].resetValidation();
  openPopup(popupProfile);
});

//Открыть попап добавления карточки
buttonAddCard.addEventListener('click', () => {
  popupCardForm.reset();
  //Сброс валидации с использованием метода класса
  formValidators['cardForm'].resetValidation();
  openPopup(popupCard);
});

//Сохранить изменения профиля
popupProfileForm.addEventListener('submit', event => {
  event.preventDefault();
  savePopup(saveProfileChanges, popupProfile)
});

//Добавить новую карточку
popupCardForm.addEventListener('submit', event => {
  event.preventDefault();
  savePopup(addNewCard, popupCard);
});

function handleCardClick(name, link) {
  popupPicture.alt = `Место: ${name}`;
  popupPicture.src = link;
  popupPictureName.textContent = name;

  openPopup(popupPictureContainer);
}

//Создание карточки
function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавить карточки изображений
initialCards.forEach(item => {
  const cardElement = createCard(item);
  cardContainer.append(cardElement);
});

//Создать объект карточки на основе инпутов
function generateCardData() {
  const popupCardData = {};
  popupCardData.name = popupImageTitle.value;
  popupCardData.alt = `Место: ${popupImageTitle.value}`;
  popupCardData.link = popupImageLink.value;
  return popupCardData;
}

//Добавить новую карточку
function addNewCard() {
  const cardData = generateCardData();
  const cardElement = createCard(cardData);
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
function addKeydownListener() {
  document.addEventListener('keydown', addKeyHandler);
}
function removeKeydownListener() {
  document.removeEventListener('keydown', addKeyHandler);
}
function addKeyHandler(event) {
  if (event.key === 'Escape'){
    const popup = container.querySelector('.popup_opened');
    closePopup(popup);
  }
}

