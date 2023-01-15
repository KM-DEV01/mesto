export class FormValidator {
  constructor(config, element) {
    this._config = config;
    this._formElement= element;
  }

  _isValid(inputList) {
  return !inputList.some(inputElement => !inputElement.validity.valid)
  }

   _toggleButtonState(buttonElement, inputList, config) {
    if (this._isValid(inputList)) {
      this._enableSubmitButton(buttonElement, config)
    } else {
      this._disableSubmitButton(buttonElement, config)
    }
  }

  _enableSubmitButton(buttonElement, config) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _disableSubmitButton(buttonElement, config) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass);
  }

  _hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
  }

  _checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement, config);
    } else {
      this._showInputError(formElement, inputElement, config);
    }
  }

  _setEventListeners() {
    const formElement = this._formElement;
    const config = this._config;

    const submitButton = formElement.querySelector(config.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, config);
        this._toggleButtonState(submitButton, inputList, config);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}