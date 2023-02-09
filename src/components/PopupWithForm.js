import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._popupProfileForm = this._popup.querySelector('.popup__form')

  }
  _getInputValue() {
    const inputData = {};
    Array.from(this._popup.querySelectorAll('input')).forEach(elem => {
      inputData[elem.name] = elem.value;
    });
    return inputData;
  }

  _handleSubmit = () => {
    this._popupProfileForm.addEventListener('submit', event => {
      event.preventDefault();
      this._submitFunction(this._getInputValue());
      this.close();
    })
  }

  setEventListeners = () => {
    this._handleSubmit();
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupProfileForm.reset()
  }
}
