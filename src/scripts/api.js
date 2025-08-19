class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleServerResponse)
      .catch(console.error);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._handleServerResponse)
      .catch(console.error);
  }

  getSiteInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
      .then(function ([cards, userInfo]) {
        return { userInfo, cards };
      })
      .catch(console.error);
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes` ,{
      method: "PUT",
      headers: this._headers,
    })
    .then(this._handleServerResponse)
    .catch(console.error);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._handleServerResponse)
    .catch(console.error);
  }


  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then(this._handleServerResponse)
      .catch(console.error);
  }

  editUserAvatar({avatar}) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: this._headers,
    "Content-Type": "application/json",
    body: JSON.stringify({
      avatar,
    }),
    })
    .then(this._handleServerResponse)
    .catch(console.error);
  }


  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleServerResponse)
      .catch(console.error);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleServerResponse)
      .catch(console.error);
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}

export default Api;
