const fetch = require('node-fetch')

const baseURL = ''

const api = {
  headers () {
    return {
      'Authorization': '',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  request (url, options, passThrough) {
    // This can be called directly for custom calls
    return new Promise((resolve, reject) => {
      return fetch(url, options).then(
        (response) => {
          // console.log('RES', response)
          if (response.ok) {
            return response.json().then(
              (json) => {
                if (passThrough) {
                  json = {
                    results: {
                      ...json
                    },
                    ...passThrough
                  }
                }

                return resolve(json)
              }
            )
          } else {
            return response.json().then(
              (json) => reject('There was an error with this request.')
            )
          }
        },
        (err) => {
          reject(err)
        }
      )
    })
  },
  get (endpoint, passThrough) {
    var options = {
      headers: this.headers(),
      method: 'GET',
      mode: 'cors'
    }

    return this.request(`${baseURL}/${endpoint}`, options, passThrough)
  },
  post (endpoint, data, passThrough) {
    var options = {
      headers: this.headers(),
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors'
    }

    return this.request(`${baseURL}/${endpoint}`, options, passThrough)
  },
  put (endpoint, data, passThrough) {
    var options = {
      headers: this.headers(),
      method: 'PUT',
      body: JSON.stringify(data),
      mode: 'cors'
    }

    return this.request(`${baseURL}/${endpoint}`, options, passThrough)
  },
  delete (endpoint, passThrough) {
    var options = {
      headers: this.headers(),
      mode: 'cors'
    }

    return this.request(`${baseURL}/${endpoint}`, options, passThrough)
  }
}

export default api
