import { initialCards } from '../utils/cards.js';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo';
import '../pages/index.css';

import {
  buttonEditProfile,
  buttonAddCard,
  cardTemplate,
  validationConfig,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  profileFields
} from '../utils/constants'

const formValidators = {}
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

//Создание карточки
function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick);
  return card.generateCard();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.card__list')
cardList.renderItems();

//Колбэк при сабмите формы для добавления новой карточки
function saveNewCard(data) {
  const cardData = {};
  cardData.name = data.imageName;
  cardData.link = data.url;
  cardList.addItem(createCard(cardData), 'prepend');
}
//попап формы карточки
const popupFormCard = new PopupWithForm(popupCardSelector, saveNewCard);
popupFormCard.setEventListeners();

// функции заполнения полей профиля
const userProfileInfo = new UserInfo(profileFields);

//заполнить инпуты при редактировании профиля
function fillProfileInputs() {
  const data = userProfileInfo.getUserInfo();
  popupFormProfile.setInputValues(data);
}

//заполнить поля профиля
function saveProfileChanges(data) {
  userProfileInfo.setUserInfo(data)
}
//попап формы профиля
const popupFormProfile = new PopupWithForm(popupProfileSelector, saveProfileChanges);
popupFormProfile.setEventListeners();

//Открыть попап редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  fillProfileInputs();
  //Сброс валидации с использованием метода класса
  formValidators['profileForm'].resetValidation();
  popupFormProfile.open()
});

//Открыть попап добавления карточки
buttonAddCard.addEventListener('click', () => {
  //Сброс валидации с использованием метода класса
  formValidators['cardForm'].resetValidation();
  popupFormCard.open()
});

const popupImage = new PopupWithImage(popupImageSelector)
popupImage.setEventListeners()
//ф-ция колбэк при нажатии на карточку
function handleCardClick(data) {
  return popupImage.open(data)
}

