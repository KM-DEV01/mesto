import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._popupProfileForm = this._popup.querySelector('.popup__form');

    this._inputList = Array.from(this._popup.querySelectorAll('input'));
  }

  _getInputValue() {
    const inputData = {};
    this._inputList.forEach(elem => {
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

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
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
