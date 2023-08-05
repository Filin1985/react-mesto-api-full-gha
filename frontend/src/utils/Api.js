class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(
      `Something fo wrong ${res.status} with request to ${this._url}`
    )
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  getUserProfile() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: "include",
    })
  }

  getAllCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
      credentials: "include",
    })
  }

  saveProfileData(newName, newProfession) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newProfession,
      }),
      credentials: "include",
    })
  }

  addNewCard(name, link) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      credentials: "include",
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: "include",
    })
  }

  addLikeToCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: "include",
    })
  }

  removeLikeFromCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: "include",
    })
  }

  editAvatar(avatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
      credentials: "include",
    })
  }
}

export const api = new Api({
  url: 'https://api.my.places.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
  },
})
