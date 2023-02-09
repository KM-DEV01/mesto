export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _addKeydownListener() {
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeKeydownListener() {
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._addKeydownListener();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeKeydownListener();
  }

  setEventListeners () {
    this._popup.addEventListener('click', event => {
      const targetClassList = event.target.classList;
      if (targetClassList.contains('popup') || targetClassList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
}