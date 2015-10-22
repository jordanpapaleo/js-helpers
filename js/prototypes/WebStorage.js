/* global Base64 */

/**
 * A generic web storage factory for session and local storage
 * @param {String} storageType   'localStorage' || 'sessionStorage'
 *     - derived from the window[property] for web storage
 */
function WebStorage (storageType) {
  this.type = null
  this.webStorage = null

  this.isSupported = this.checkSupportFor(storageType)
}

WebStorage.prototype.serialize = function (value) {
  return JSON.stringify(value)
}

WebStorage.prototype.deserialize = function (value) {
  return JSON.parse(value)
}

WebStorage.prototype.encode = function (value) {
  return Base64.encode(value)
}

WebStorage.prototype.decode = function (value) {
  return Base64.decode(value)
}

/**
 * Determines if named web storage type is enabled in this browser
 * @return {Boolean} True if the browser supports named web storage
 */
WebStorage.prototype.checkSupportFor = function (storageType) {
  if (storageType in window && window[storageType] != null) {
    this.webStorage = window[storageType]
    this.type = storageType
    return true
  } else {
    return false
  }
}

/**
 * Adds a key value pair to web storage. If the value given in an array or object, it is
 * stringified into JSON format and saved as a string.
 * @param {String} key   Key to store the data with
 * @param {String|Object|Array} value The value to store; may be a string, object or array
 */
WebStorage.prototype.set = function (key, value) {
  if (this.isSupported) {
    if (typeof value === undefined) {
      value = null
    }

    try {
      if (value instanceof Object) {
        value = this.serialize(value)
      }

      if (value !== null) {
        value = this.encode(value)
      }

      this.webStorage.setItem(key, value)

      return true
    } catch (error) {
      console.error('Unable to save key ' + key + ' to ' + this.type)
      return false
    }
  }

  return false
}

/**
 * Retrieves a value from web storage given a key. If the value is an array or object in JSON
 * format, it is converted into an Object before being returned
 * @param  {String} key The key to look up
 * @return {String|Object|Array}     The item in web storage.
 */
WebStorage.prototype.get = function (key) {
  if (this.isSupported) {
    var value = ''

    try {
      value = this.webStorage.getItem(key)
    } catch (error) {
      console.error('Error attempting to get key ' + key + ' from ' + this.type)
      throw new Error('Unable to get stored preference')
    }

    if (!value) {
      value = null
    }

    if (value !== null) {
      value = this.decode(value)
      if ((value.charAt(0) === '{') || (value.charAt(0) === '[')) {
        value = this.deserialize(value)
      }
    }

    return value
  }

  return undefined
}

/**
 * Returns all keys in web storage that start with keyPrefix; if keyPrefix is not provided, all keys are returned.
 * @param  {String} keyPrefix If provided, returns keys that start with this value
 * @return {Array}           An array of matching keys
 */
WebStorage.prototype.getAll = function (keyPrefix) {
  var returnKeys = []
  var key
  var keyPrefixLength

  if (keyPrefix != null) {
    keyPrefixLength = keyPrefix.length
  } else {
    keyPrefixLength = 0
  }

  try {
    for (key in this.webStorage) {
      if ((keyPrefixLength === 0) || (key.substr(0, keyPrefixLength) === keyPrefix)) {
        returnKeys.push(key.substr(keyPrefixLength))
      }
    }
  } catch (error) {
    throw new Error('Unable to read stored preferences.')
  }

  return returnKeys
}

/**
 * Removes (deletes) a given key from the web storage database.
 * @param  {String} key Key to be deleted
 * @return {boolean}     True if delete succeeded, false otherwise.
 */
WebStorage.prototype.remove = function (key) {
  if (this.isSupported) {
    try {
      this.webStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error occurred while trying to remove key ' + key + ' from ' + this.type)
      return false
    }
  }

  return false
}

/**
 * Removes (deletes) a ALL keys from the web storage database.
 * @return {boolean} True if delete succeeded, false otherwise.
 */
WebStorage.prototype.clear = function () {
  if (this.isSupported) {
    try {
      this.webStorage.clear()
      return true
    } catch (error) {
      console.error('Error occurred while trying to clear ALL data from ' + this.type)
      return false
    }
  }

  return false
}
