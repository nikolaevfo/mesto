export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleOriginalResponse(response) {
    if (!response.ok) {
      return Promise.reject(`Error: ${response}`);
    }
    return response.json();
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  douwnloadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  patchUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleOriginalResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleOriginalResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  disLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleOriginalResponse);
  }

  patchUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleOriginalResponse);
  }
}
