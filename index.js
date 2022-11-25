const container = document.querySelector('.page__container');
const profileEditButton = container.querySelector('.profile__edit-button');
const profileName = container.querySelector('.profile__name');
const profileCaption = container.querySelector('.profile__caption');
const popup = container.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');

const popupName = popupForm.elements['name'];
const popupCaption = popupForm.elements['caption'];

profileEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupSave);

function popupOpen() {
    popup.classList.add('popup__opened');
    popupFieldsFilling();
}

function popupClose() {
    popup.classList.remove('popup__opened');
}

function popupFieldsFilling() {
    popupName.value = profileName.textContent;
    popupCaption.value = profileCaption.textContent;
}

function popupSave(event) {
    event.preventDefault();

    profileName.textContent = popupName.value;
    profileCaption.textContent = popupCaption.value;

    popupClose();
}
