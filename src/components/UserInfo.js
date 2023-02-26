export class UserInfo {
  constructor({ name, about, avatar}) {
    this._username = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const profileInfoCurrent = {}
    profileInfoCurrent.name = this._username.textContent;
    profileInfoCurrent.about = this._about.textContent;
    return profileInfoCurrent
  }

  //Сюда передаем объект с данными
  setUserInfo({ name, about }) {
    this._username.textContent = name;
    this._about.textContent = about;
  }

  getUserAvatar() {
    const url = {}
    url.avatar = this._avatar.style.backgroundImage.slice(5, -2);
    return url;
  }

  //Сюда передаем объект с данными
  setUserAvatar({ avatar }) {
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }

  setUserId({ _id }) {
    this._id = _id;
  }

  getUserId() {
    return this._id;
  }

}