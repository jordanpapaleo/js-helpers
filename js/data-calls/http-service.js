/* global XMLHttpRequest */

const HTTP = {
  get (url, cb) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(xhr.responseText)
      }
    }

    xhr.open('GET', url, true)
    xhr.send()
  },
  post () {
    // TODO
  },
  delete () {
    // TODO
  },
  put () {
    // TODO
  }
}

export default HTTP
