import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popupForm.querySelector('.popup__save-button');
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
    this._popupForm.addEventListener('submit', event => {
      event.preventDefault();
      this._submitFunction(this._getInputValue(), this._popupForm)
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
    this._popupForm.reset()
  }
}
