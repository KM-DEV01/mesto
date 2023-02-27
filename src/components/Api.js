export class Api {
  constructor(url, options) {
    this._options = options;
    this._baseUrl = url;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._options)
      .then((res) => this._getResponse(res));
  }

  async getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._options)
      .then((res) => this._getResponse(res));
  }

  async setProfileInfo(options) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._options,
      ...options
    })
      .then((res) => this._getResponse(res));
  }

  async addNewCard(options) {
    return fetch(`${this._baseUrl}/cards`, {
      ...this._options,
      ...options
    })
      .then((res) => this._getResponse(res));
  }

  async deleteCard(options, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      ...this._options,
      ...options
    })
      .then((res) => this._getResponse(res));
  }

  async likeCard(options, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      ...this._options,
      ...options
    })
      .then((res) => this._getResponse(res));
  }

  async updateAvatar(options){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      ...this._options,
      ...options
    })
      .then((res) => this._getResponse(res));
  }
}

