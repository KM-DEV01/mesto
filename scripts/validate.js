
//показывать сообщение
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

//скрыть сообщение
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}

//проверить валиден ли инпут
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

//повесить каждому инпуту функцию
function setEventListeners(formElement, config) {
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  toggleButton(submitButton, inputList, config);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButton(submitButton, inputList, config);
    });
  })
}

//проверить валидность
function isValid(inputList) {
  return !inputList.some(inputElement => !inputElement.validity.valid)
}

//подключить стили кнопки
function toggleButton(buttonElement, inputList, config) {
  if (isValid(inputList)) {
    buttonElement.classList.add(config.activeButtonClass);
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.remove(config.activeButtonClass);
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  }
}

//передать конфиг
function enableValidation({...restConfig}) {
  const formList = Array.from(document.querySelectorAll(restConfig.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, restConfig);
  });
}
