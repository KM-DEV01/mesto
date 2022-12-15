const container = document.querySelector('.page__container');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileName = container.querySelector('.profile__name');
const profileCaption = container.querySelector('.profile__caption');
const popup = container.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const addButton = container.querySelector('.profile__add-button');
const likeButton = Array.from(document.querySelectorAll('.element__like-button'));
const deleteButton = Array.from(document.querySelectorAll('.element__delete-button'));
const elementItem = Array.from(document.querySelectorAll('.element__item'));
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

function popupOpen(inOpenFunc) {
  //анимация
  popup.classList.add('popup__opened');
  popup.classList.remove('popup__closed');

  if (inOpenFunc) {
    inOpenFunc();
  }
}

function popupClose() {
  //анимация
  popup.classList.add('popup__closed');
  setTimeout(()=>{
    document.querySelector('.popup__inputs').remove();
    popup.classList.remove('popup__opened');
  }, 500)
}

function popupSave(onSaveFunc) {
  if (onSaveFunc) {
    onSaveFunc();
  }
  popupClose();
}

function popupFieldsFilling() {
  const popupName = popupForm.elements['name'];
  const popupProperty = popupForm.elements['property'];

  popupName.value = profileName.textContent;
  popupProperty.value = profileCaption.textContent;
}

function saveProfileChanges () {
  const popupName = popupForm.elements['name'];
  const popupProperty = popupForm.elements['property'];

  profileName.textContent = popupName.value;
  profileCaption.textContent = popupProperty.value;
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
  imagePopupOpen(elementItem);
}

//Добавляет инпуты в попап
function addPopupInputs (popupTitle = 'Редактировать профиль', placeholderName = 'Имя',
                         placeholderProperty = 'О себе', buttonText = 'Сохранить',
                         buttonName = 'edit') {
  const popupFieldsTemplate = document.querySelector('#popup-inputs-template').content;
  const popupInputs = popupFieldsTemplate.querySelector('.popup__inputs').cloneNode(true);
  const inputBtn = popupInputs.querySelector('.popup__save-button');

  popupInputs.querySelector('.popup__title').textContent = popupTitle;
  popupInputs.querySelector('.popup__field[name="name"]').placeholder = placeholderName;
  popupInputs.querySelector('.popup__field[name="property"]').placeholder = placeholderProperty;
  inputBtn.textContent = buttonText;
  inputBtn.name = buttonName;

  popupForm.append(popupInputs);
}

initialCards.reverse().forEach(element => addElement(element.name, element.link));

function addNewElement () {
  const popupName = popupForm.elements['name'].value;
  const popupProperty = popupForm.elements['property'].value;
  addElement(popupName, popupProperty);
}

profileEditButton.addEventListener('click', () => {
  addPopupInputs();
  popupOpen(popupFieldsFilling);
});

addButton.addEventListener('click', () => {
  addPopupInputs('Новое место', 'Название', 'Ссылка на картинку',
    'Создать', 'add');
  popupOpen();
});

popupCloseButton.addEventListener('click', popupClose);

// добвляет картинку, если атрибут name кнопки в попапе = add, иначе изменяет описание профиля
popupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const popupButton = document.querySelector('.popup__save-button').name;
  if (popupButton === 'add') {
    popupSave(addNewElement);
  } else {
    popupSave(saveProfileChanges);
  }
});

//добавить для каждой кнопки likeButton ивент
likeButton.forEach(element => {
  likeHandler(element);
});
function likeHandler(element) {
  element.addEventListener('click', event => {
    event.stopPropagation();
    event.target.classList.toggle('element__like-button_active');
  });
}

//добавить для каждой кнопки deleteButton ивент
deleteButton.forEach(element => {
  deleteHandler(element);
})
function deleteHandler(element) {
  element.addEventListener('click', event => {
    event.stopPropagation();
    event.target.closest('.element__item').remove();
  })
}

//Добавить к elementItem ивент открытия попапа
elementItem.forEach(element => imagePopupOpen(element));
function imagePopupOpen(element) {
  element.addEventListener('click', event => {

    const elementItem = event.target.closest('.element__item');
    const elementName = elementItem.querySelector('.element__name').textContent;
    const elementImage = elementItem.querySelector('.element__image').src;

    const imagePopupTemplate = document.querySelector('#image-popup-template').content;
    const imagePopup = imagePopupTemplate.querySelector('.image-popup').cloneNode(true);
    const imagePopupPic = imagePopup.querySelector('.image-popup__picture');
    const imagePopupName = imagePopup.querySelector('.image-popup__name');
    const imagePopupCloseBtn = imagePopup.querySelector('.image-popup__close-button');

    imagePopupPic.src = elementImage;
    imagePopupName.textContent = elementName;

    //анимация
    imagePopup.classList.add('image-popup__opened');
    imagePopup.classList.remove('image-popup__closed');

    container.append(imagePopup);

    imagePopupCloseBtn.addEventListener('click', event => {
      const element = event.target.closest('.image-popup');

      //анимация
      element.classList.remove('image-popup__opened');
      element.classList.add('image-popup__closed');
      setTimeout(()=>{
        element.remove();
      }, 500)

    })
  })
}