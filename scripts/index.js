const container = document.querySelector('.page__container');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileName = container.querySelector('.profile__name');
const profileCaption = container.querySelector('.profile__caption');
const addButton = container.querySelector('.profile__add-button');
const popupCloseButtons = container.querySelectorAll('.popup__close-button');
const elementContainer = container.querySelector('.element__list');

//Попап профиля
const popupProfile = container.querySelector('.popup-edit-profile');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const popupProfileName = popupProfileForm.elements['name'];
const popupProfileProperty = popupProfileForm.elements['property'];

//Попап карточек
const popupCard = container.querySelector('.popup-add-card');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupImageTitle = popupCardForm.elements['name'];
const popupImageLink = popupCardForm.elements['property'];

//Попап изображений
const imagePopup = container.querySelector('.image-popup');
const imagePopupPic = imagePopup.querySelector('.image-popup__picture');
const imagePopupName = imagePopup.querySelector('.image-popup__name');

//Темплейт карточек
const elementTemplate = document.querySelector('#element-template').content;

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
function openPopup(popup) {
  popup.classList.add('popup_opened')
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

// обработчики кнопок в попапе
profileEditButton.addEventListener('click', () => {
  fillPopupFields();
  openPopup(popupProfile)
});
addButton.addEventListener('click', () => {
  openPopup(popupCard);
  popupImageTitle.value = '';
  popupImageLink.value = '';
});
popupCloseButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

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
  const likeButton = elementItem.querySelector('.element__like-button');
  const deleteButton = elementItem.querySelector('.element__delete-button');

  elementItem.querySelector('.element__name').textContent = name;
  elementItem.querySelector('.element__image').alt = `Место: ${name}`;
  elementItem.querySelector('.element__image').src = link;

  likeImageCard(likeButton);
  deleteImageCard(deleteButton);
  openImageCard(elementItem);
  
  return elementItem;
}

function addNewElement () {
  const popupName = popupImageTitle.value;
  const popupProperty = popupImageLink.value;
  elementContainer.prepend(createCard(popupName, `Место: ${popupName}`, popupProperty));
}

initialCards.forEach(element => elementContainer.append(createCard(element.name, `Место: ${element.name}`, element.link)));