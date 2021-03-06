class Api {
  constructor() {
    this._baseUrl = 'https://api.renita.students.nomoreparties.sbs'
    this._authToken = `Bearer ${localStorage.getItem('token')}`
    this._contentType = 'application/json'
    this._headers = {
      'Authorization': this._authToken,
      'Content-Type': this._contentType,
    }
  }

  updateAuthToken(token, id) {
    this._authToken = `Bearer ${token}`
    this._id = id
    this._headers = {
      'Authorization': this._authToken,
      'Content-Type': this._contentType,
    }
  }

  _checkServerCode(res) {
    if (res.ok) {
      return res.json()
    }
  }

  // 1 Load user info from server
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._checkServerCode(res))
      .catch(err => err)
  }

  // 2 Load cards from server
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers, 
    })
      .then(res => this._checkServerCode(res))
      .catch(err => err)
  }

  // 3 Edit profile info
  saveProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._checkServerCode(res))
      .catch(err => err)
  }

  // 9 Update profile pic in server
  saveAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._checkServerCode(res))
      .catch(err => err)
  }

  // 4 Add new card to server
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._checkServerCode(res))
      .catch(err => err)
  }

  // 7 Delete card from server
  trashCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkServerCode(res))
      .catch(err => err)
  }

  // 8A Add like to card
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._checkServerCode(res))
      .catch(err => err)
  }

  // 8B Remove like from card
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkServerCode(res))
      .catch(err => err)
  }

  // Check user's card like status and toggle
  changeLikeCardStatus(cardId, isNotLiked) {
    if (isNotLiked) {
      return this.addLike(cardId)
    } else {
      return this.removeLike(cardId)
    }
  }
}

const api = new Api()

export default api