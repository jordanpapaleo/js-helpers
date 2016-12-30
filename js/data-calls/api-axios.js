import axios from 'axios'

const baseURL = window.location.origin

function request (url, options, passThrough) {
  console.time(url)
  return new Promise((resolve, reject) => {
    return axios(url, options).then(
      (response) => {
        if (response.statusText === 'OK') {
          if (passThrough) {
            response.data = {
              ...response.data,
              ...passThrough
            }
          }
          resolve(response.data)
        } else {
          reject({
            status: response.status,
            statusText: response.statusText
          })
        }
        console.timeEnd(url)
      },
      (err) => {
        console.timeEnd(url)
        reject(err)
      }
    )
  })
}

const headers = function () {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export const api = {
  get (url, passThrough) {
    const options = {
      headers: headers(),
      method: 'GET',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  },
  post (url, data, passThrough) {
    const options = {
      data,
      headers: headers(),
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  },
  put (url, data, passThrough) {
    const options = {
      data,
      headers: headers(),
      method: 'PUT',
      body: JSON.stringify(data),
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  },
  delete (url, passThrough) {
    const options = {
      headers: headers(),
      method: 'DELETE',
      mode: 'cors'
    }

    return request(`${baseURL}/${url}`, options, passThrough)
  }
}
