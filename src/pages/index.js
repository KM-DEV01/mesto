import {Card} from '../components/Сard.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithConfirm} from '../components/PopupWithConfirm';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';
import '../pages/index.css';

import {
  buttonEditProfile,
  buttonAddCard,
  cardTemplate,
  validationConfig,
  popupProfileSelector,
  popupCardSelector,
  popupImageSelector,
  profileFields,
  popupConfirm,
  popupAvatarSelector,
  buttonEditAvatar
} from '../utils/constants';

const popupFormCard = new PopupWithForm(popupCardSelector, addCard);
const popupFormProfile = new PopupWithForm(popupProfileSelector, saveProfileChanges);
const popupFormConfirm = new PopupWithConfirm(popupConfirm, deleteCard);
const popupFormAvatar  = new PopupWithForm(popupAvatarSelector, updateAvatar);
const popupImage = new PopupWithImage(popupImageSelector);
const userProfileInfo = new UserInfo(profileFields);

//Валидация
const formsValidator = {}
const enableValidator = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    //получение имени формы
    const formName = formElement.getAttribute('name');
    //запись экземпляра в объект formsValidator в объект с именем формы
    formsValidator[formName] = validator;
    //вызов метода enableValidation экземпляром класса
    validator.enableValidation();
  })
}

const cardList = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.card__list')

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-60',
  {
    headers: {
      authorization: 'c3588739-7d46-4828-9355-4513d2ca8508',
      'Content-Type': 'application/json'
    }
  });

////////////////////
//Колбэки для форм//
//↓↓↓          ↓↓↓//
////////////////////

function addCard(data) {
  return api.addNewCard({
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then((res) => {
      cardList.addItem(createCard(res), 'prepend');
    })
}

function saveProfileChanges(data) {
  userProfileInfo.setUserInfo(data)
  return  api.setProfileInfo({
    method: 'PATCH',
    body: JSON.stringify(data)
  })
}

function updateAvatar(data) {
  return api.updateAvatar({
    method: 'PATCH',
    body: JSON.stringify(data)
  })
    .then((res) => {
      userProfileInfo.setUserAvatar(res)
    })
}

function deleteCard(cardId) {
  return api.deleteCard({
    method: 'DELETE',
  }, cardId)
}

////////////////////
//↑↑↑          ↑↑↑//
//Колбэки для форм//
////////////////////

function createCard(item) {
  const card = new Card(item,
    cardTemplate,
    (arg) => popupImage.open(arg),
    (arg) => popupFormConfirm.open(arg),
    (card, method, func) => likeCard(card, method, func),
    userProfileInfo.getUserId(),
  );
  return card.generateCard();
}

function likeCard(cardId, method, func) {
  api.likeCard({
      method: method
  },cardId)
    .then((res) => {
      func(res)
    })
}
function fillProfileInputs(data, form) {
  form.setInputValues(data);
}

buttonEditProfile.addEventListener('click', () => {
  fillProfileInputs(userProfileInfo.getUserInfo(), popupFormProfile);
  //Сброс валидации с использованием метода класса
  formsValidator['profileForm'].resetValidation();
  popupFormProfile.open()
});

buttonAddCard.addEventListener('click', () => {
  formsValidator['cardForm'].resetValidation();
  popupFormCard.open()
});

buttonEditAvatar.addEventListener('click', () => {
  fillProfileInputs(userProfileInfo.getUserAvatar(), popupFormAvatar);
  formsValidator['avatarEditForm'].resetValidation();
  popupFormAvatar.open()
})

api.getInitialCards()
  .then((res) => {
    res.forEach(item => {
      cardList.addItem(createCard(item));
    })
  })

api.getProfileInfo()
  .then((res)=> {
    userProfileInfo.setUserAvatar(res);
    userProfileInfo.setUserInfo(res);
    userProfileInfo.setUserId(res);
  })

cardList.renderItems();
popupFormCard.setEventListeners();
popupFormProfile.setEventListeners();
popupImage.setEventListeners();
popupFormConfirm.setEventListeners();
popupFormAvatar.setEventListeners();

enableValidator(validationConfig);