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
      const text = this._submitButton.textContent
      this._submitButton.textContent = 'Сохранение...'
      this._submitFunction(this._getInputValue(), this._popupForm)
        .catch((err) => {
          return err.json()
            .then((err) => {
            console.log(err.message)
          })
        })
        .finally(() => {
          this._submitButton.textContent = text;
          this.close();
        });
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
