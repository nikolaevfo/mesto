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
}