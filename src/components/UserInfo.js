export class UserInfo {
  constructor({ name, about }) {
    this._username = document.querySelector(name);
    this._about = document.querySelector(about);
  }

  getUserInfo() {
    const profileInfoCurrent = {}
    profileInfoCurrent.name = this._username.textContent;
    profileInfoCurrent.about = this._about.textContent;
    return profileInfoCurrent
  }

  //Сюда передаем объект с данными
  setUserInfo({ name, caption }) {
    this._username.textContent = name;
    this._about.textContent = caption;
  }
}