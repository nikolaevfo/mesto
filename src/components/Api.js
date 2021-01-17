export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(`Ошибка ${response}`)
      })
  }

  douwnloadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(`Ошибка ${response}`)
      })
  }

  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка ${result}`)
      })
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка ${result}`)
      })
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка ${result}`)
      })
  }

  checkLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка ${result}`)
      })
  }

  disLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка ${result}`)
      })
  }

  patchUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        return Promise.reject(`Ошибка ${result}`)
      })
  }
}