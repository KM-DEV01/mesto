export class Api {
  constructor(url, options) {
    this._options = options;
    this._baseUrl = url;
  }

  async getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, this._options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res)
      })
  }

  async getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res)
      })
  }

  async setProfileInfo(options) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._options,
      ...options
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res)
      })
  }

  async addNewCard(options) {
    return fetch(`${this._baseUrl}/cards`, {
      ...this._options,
      ...options
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res)
      })
  }

  async deleteCard(options, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      ...this._options,
      ...options
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res)
      })
  }

  async likeCard(options, cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      ...this._options,
      ...options
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res)
      })
  }

  async updateAvatar(options){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      ...this._options,
      ...options
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res)
      })
  }
}

