class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(){
return fetch (`${this._baseUrl}/users/me`, {
headers: this._headers,
})
.then(this._handleServerResponse)
.catch(console.error);
}

getInitalCards() {
  return fetch (`${this._baseUrl}/cards`, {
  headers:this._headers,
  })
  .then(this._handleServerResponse)
  .catch(console.error);
}

getSiteInfo(){
  return Promise.all([this.getInitialCards(), this.getUserInfo()])
  .then(([cards,userInfo]) => {
    return {userInfo, cards};
  })
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