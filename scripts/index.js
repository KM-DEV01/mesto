const container = document.querySelector('.page__container');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileName = container.querySelector('.profile__name');
const profileCaption = container.querySelector('.profile__caption');
const addButton = container.querySelector('.profile__add-button');

//Попап профиля
const popupProfile = container.querySelector('.popup-edit-profile');
const popupProfileCloseBtn = popupProfile.querySelector('.popup__close-button');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfileForm.elements['name'];
const popupProfileProperty = popupProfileForm.elements['property'];

//Попап карточек
const popupCard = container.querySelector('.popup-add-card');
const popupCardCloseBtn = popupCard.querySelector('.popup__close-button');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupImageTitle = popupCardForm.elements['name'];
const popupImageLink = popupCardForm.elements['property'];

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Функции кнопок на попапе
function popupOpen(popup) {
  // popup.classList.add('popup')
  popup.classList.remove('popup_close')
  setTimeout(() => popup.classList.add('popup_animation-state_opened'));
}
function popupClose(popup) {
  popup.classList.add('popup_animation-state_closed');
  popup.classList.remove('popup_animation-state_opened');
  setTimeout(() => popup.classList.remove('popup_animation-state_closed'), 500);
  setTimeout(() => popup.classList.add('popup_close'), 500);
}
function popupSave(onSaveFunc, popup) {
  onSaveFunc();
  popupClose(popup);
}

// функции заполнения полей профиля
function popupFieldsFilling() {
  popupProfileName.value = profileName.textContent;
  popupProfileProperty.value = profileCaption.textContent;
}
function saveProfileChanges () {
  profileName.textContent = popupProfileName.value;
  profileCaption.textContent = popupProfileProperty.value;
}

// обработчики кнопок в попапе
profileEditButton.addEventListener('click', () => {
  popupFieldsFilling();
  popupOpen(popupProfile)
});
addButton.addEventListener('click', () => popupOpen(popupCard));
popupProfileCloseBtn.addEventListener('click', () => popupClose(popupProfile));
popupCardCloseBtn.addEventListener('click', () => popupClose(popupCard));
popupProfileForm.addEventListener('submit', event => {
  event.preventDefault();
  popupSave(saveProfileChanges, popupProfile)
});
popupCardForm.addEventListener('submit', event => {
  event.preventDefault();
  popupSave(addNewElement, popupCard);
});

// функции обработчики для карточек
function likeHandler(element) {
  element.addEventListener('click', event => {
    event.stopPropagation();
    event.target.classList.toggle('element__like-button_active');
  });
}
function deleteHandler(element) {
  element.addEventListener('click', event => {
    event.stopPropagation();
    event.target.closest('.element__item').remove();
  })
}

//Попап картинок
function openHandler(element) {
  element.addEventListener('click', event => {
    const elementItem = event.target.closest('.element__item');
    const elementName = elementItem.querySelector('.element__name').textContent;
    const elementImage = elementItem.querySelector('.element__image').src;

    const imagePopup = container.querySelector('.image-popup');
    const imagePopupPic = imagePopup.querySelector('.image-popup__picture');
    const imagePopupName = imagePopup.querySelector('.image-popup__name');
    const imagePopupCloseBtn = imagePopup.querySelector('.image-popup__close-button');

    imagePopupPic.src = elementImage;
    imagePopupName.textContent = elementName;

    //анимация
    console.log(imagePopup)
    popupOpen(imagePopup);
    imagePopupCloseBtn.addEventListener('click', () => popupClose(imagePopup));
  })
}

// Добавляет карточки изображений
const addElement = (name, link) => {
  const elementTemplate = document.querySelector('#element-template').content;

  const elementItem = elementTemplate.querySelector('.element__item').cloneNode(true);

  const likeButton = elementItem.querySelector('.element__like-button');
  const deleteButton = elementItem.querySelector('.element__delete-button');
  const elementContainer = document.querySelector('.element__list');

  elementItem.querySelector('.element__name').textContent = name;
  elementItem.querySelector('.element__image').src = link;

  elementContainer.prepend(elementItem);

  likeHandler(likeButton);
  deleteHandler(deleteButton);
  openHandler(elementItem);
}

function addNewElement () {
  const popupName = popupImageTitle.value;
  const popupProperty = popupImageLink.value;
  addElement(popupName, popupProperty);
}

initialCards.reverse().forEach(element => addElement(element.name, element.link));