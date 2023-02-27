import {Card} from '../components/Сard.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithConfirmation} from '../components/PopupWithConfirmation';
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

const userProfileInfo = new UserInfo(profileFields);
const popupFormCard = new PopupWithForm(popupCardSelector, addCard);
const popupFormProfile = new PopupWithForm(popupProfileSelector, saveProfileChanges);
const popupFormConfirm = new PopupWithConfirmation(popupConfirm, deleteCard);
const popupFormAvatar  = new PopupWithForm(popupAvatarSelector, updateAvatar);
const popupImage = new PopupWithImage(popupImageSelector);

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

function addCard(data, form) {
  const defaultText = initLoading(true, form);
  api.addNewCard({
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then((res) => {
      this.close();
      cardList.addItem(createCard(res), 'prepend');
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      initLoading(false, form, defaultText);
    });
}

function saveProfileChanges(data, form) {
  const defaultText = initLoading(true, form);
  api.setProfileInfo({
    method: 'PATCH',
    body: JSON.stringify(data)
  })
    .then(() => {
      this.close();
      userProfileInfo.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      initLoading(false, form, defaultText);
    });
}

function updateAvatar(data, form) {
  const defaultText = initLoading(true, form);
  api.updateAvatar({
    method: 'PATCH',
    body: JSON.stringify(data)
  })
    .then((res) => {
      this.close();
      userProfileInfo.setUserAvatar(res);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      initLoading(false, form, defaultText);
    });
}

function deleteCard(data) {
  api.deleteCard({
    method: 'DELETE',
  }, data.getCardId())
    .then(() => {
      this.close();
      data.removeCard();
    })
    .catch((err) => {
      console.log(err)
    })
}

function likeCard(data, method) {
  api.likeCard({
    method: method
  }, data.getCardId())
    .then((res) => {
      data.updateLikes(res);
    })
    .catch((err) => {
      console.log(err)
    })
}

function initLoading(isLoading, form, text='') {
  const button = form.querySelector('.popup__save-button');
  if(isLoading) {
    const defaultText = button.textContent;
    button.textContent = 'Сохранение...';
    return defaultText
  } else {
    button.textContent = text
  }
}

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

function fillProfileInputs(values, form) {
  form.setInputValues(values);
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
  formsValidator['avatarEditForm'].resetValidation();
  popupFormAvatar.open()
})

Promise.all([
  api.getProfileInfo(),
  api.getInitialCards()
])
  .then(([user, cards]) => {
    userProfileInfo.setUserAvatar(user);
    userProfileInfo.setUserInfo(user);
    userProfileInfo.setUserId(user)
    cardList.renderItems(cards)
  })
  .catch((err) => {
    console.log(err)
  })

popupFormCard.setEventListeners();
popupFormProfile.setEventListeners();
popupImage.setEventListeners();
popupFormConfirm.setEventListeners();
popupFormAvatar.setEventListeners();

enableValidator(validationConfig);