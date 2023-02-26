import { Popup } from './Popup';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._popupConfirmForm = this._popup.querySelector('.popup__form');
    this._submitFunction = submitFunction;
  }

  open(data) {
    this._card = data;
    super.open();
  }

  _deleteCard() {
    this._submitFunction(this._card.dataset.id)
      .catch((err) => {
        return err.json()
          .then((err) => {
            console.log(err.message)
          })
      })
      .finally(() => {
        this._card.remove()
        this.close();
      });
  }

  _handleSubmit = () => {
    this._popupConfirmForm.addEventListener('submit', event => {
      event.preventDefault();
      this._deleteCard();
    })
  }

  setEventListeners = () => {
    this._handleSubmit();
    super.setEventListeners();
  }
}