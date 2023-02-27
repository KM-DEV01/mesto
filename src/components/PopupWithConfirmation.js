import { Popup } from './Popup';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._popupConfirmForm = this._popup.querySelector('.popup__form');
    this._submitFunction = submitFunction;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  _handleSubmit = () => {
    this._popupConfirmForm.addEventListener('submit', event => {
      event.preventDefault();
      this._submitFunction(this._card);
    })
  }

  setEventListeners = () => {
    this._handleSubmit();
    super.setEventListeners();
  }
}