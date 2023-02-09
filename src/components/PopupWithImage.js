import { Popup } from './Popup';
export class PopupWithImage extends Popup {
  //в дату нужно передать информацию об элементе на который нажимаем
  constructor(popupSelector) {
    super(popupSelector);
    //ниже элементы попапа в которые необходимо добавить значения
    this._popupPicture = this._popup.querySelector('.popup__picture');
    this._popupPictureName = this._popup.querySelector('.popup__picture-name');

  }

  _addPopupData({name, link}) {
    this._popupPicture.src = link;
    this._popupPicture.alt = `Место: ${name}`;
    this._popupPictureName.textContent = name;
  }

  open(data) {
    this._addPopupData(data);
    super.open();
  }
}