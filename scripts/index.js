const container = document.querySelector('.page__container');
const buttonEditProfile = container.querySelector('.profile__edit-button');
const profileName = container.querySelector('.profile__name');
const profileCaption = container.querySelector('.profile__caption');
const buttonAddElement = container.querySelector('.profile__add-button');
const elementContainer = container.querySelector('.element__list');
const popupList = Array.from(container.querySelectorAll('.popup'));

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

//Попап изображений
const imagePopup = container.querySelector('.popup_type_picture');
const imagePopupPic = imagePopup.querySelector('.popup__picture');
const imagePopupName = imagePopup.querySelector('.popup__picture-name');

//Темплейт карточек
const elementTemplate = document.querySelector('#element-template').content;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  // activeButtonClass: 'popup__save-button_valid',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
}
//Включение валидации
enableValidation(validationConfig);

//Функции кнопок на попапе
function openPopup(popup) {
  popup.classList.add('popup_opened');
  addKeyListener();
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
function fillPopupFields() {
  popupProfileName.value = profileName.textContent;
  popupProfileProperty.value = profileCaption.textContent;
}
function saveProfileChanges () {
  profileName.textContent = popupProfileName.value;
  profileCaption.textContent = popupProfileProperty.value;
}
// обработчики кнопок в попапе
buttonEditProfile.addEventListener('click', () => {
  fillPopupFields();
  openPopup(popupProfile);
});

buttonAddElement.addEventListener('click', () => {
  popupImageTitle.value = '';
  popupImageLink.value = '';
  disableSubmitButton(popupCard.querySelector(validationConfig.submitButtonSelector), validationConfig);
  openPopup(popupCard);
});

popupProfileForm.addEventListener('submit', event => {
  event.preventDefault();
  savePopup(saveProfileChanges, popupProfile)
});

popupCardForm.addEventListener('submit', event => {
  event.preventDefault();
  savePopup(addNewElement, popupCard);
});

// функции обработчики для карточек
function likeImageCard(element) {
  element.addEventListener('click', event => {
    event.stopPropagation();
    event.target.classList.toggle('element__like-button_active');
  });
}
function deleteImageCard(element) {
  element.addEventListener('click', event => {
    event.stopPropagation();
    event.target.closest('.element__item').remove();
  })
}

//Попап картинок
function openImageCard(element) {
  element.addEventListener('click', event => {
    const elementItem = event.target.closest('.element__item');

    imagePopupPic.alt = elementItem.querySelector('.element__image').alt;
    imagePopupPic.src = elementItem.querySelector('.element__image').src;
    imagePopupName.textContent = elementItem.querySelector('.element__name').textContent;

    //анимация
    openPopup(imagePopup);
  })
}

// Добавляет карточки изображений
const createCard = (name, alt, link) => {
  const elementItem = elementTemplate.querySelector('.element__item').cloneNode(true);
  const buttonLike = elementItem.querySelector('.element__like-button');
  const buttonDelete = elementItem.querySelector('.element__delete-button');

  elementItem.querySelector('.element__name').textContent = name;
  elementItem.querySelector('.element__image').alt = `Место: ${name}`;
  elementItem.querySelector('.element__image').src = link;

  likeImageCard(buttonLike);
  deleteImageCard(buttonDelete);
  openImageCard(elementItem);
  
  return elementItem;
}

function addNewElement() {
  const popupName = popupImageTitle.value;
  const popupProperty = popupImageLink.value;
  elementContainer.prepend(createCard(popupName, `Место: ${popupName}`, popupProperty));
}

initialCards.forEach(element => elementContainer.append(createCard(element.name, `Место: ${element.name}`, element.link)));

//закрыть попап при нажатии на оверлей или кнопку закрыть
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
  }
}


