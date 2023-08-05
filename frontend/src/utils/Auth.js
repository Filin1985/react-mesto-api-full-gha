class Auth {
  constructor({ url }) {
    this._url = url
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`An error occurred ${res.status}`)
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  registerUser(email, password) {
    console.log(email)
    return this._request(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
  }

  loginUser(email, password) {
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
  }

  logoutUser() {
    return this._request(`${this._url}/users/me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
  }

  checkUser() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    })
  }
}

export const auth = new Auth({
  url: 'https://api.my.places.nomoredomains.sbs',
})
