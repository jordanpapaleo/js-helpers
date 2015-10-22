function Observer () {
  this.observers = []
  this.observable = null
}

Observer.prototype.subscribe = function (cb) {
  var hasSubscribed = false

  if (cb instanceof Function) {
    this.observers.push(cb)
    hasSubscribed = true
  } else {
    console.debug('Callback is not a function')
  }

  return hasSubscribed
}

Observer.prototype.update = function (observable) {
  var hasUpdated = false

  if (observable) {
    this.observable = observable
    this.refresh()
    hasUpdated = true
  } else {
    console.debug('Null observable')
  }

  return hasUpdated
}

Observer.prototype.refresh = function () {
  if (this.observable) {
    for (var i = 0, j = this.observers.length; i < j; i++) {
      this.observers[i](this.observable)
    }
  }
}

Observer.prototype.reset = function () {
  this.observable = null
}

Observer.prototype.unsubscribe = function (cb) {
  var hasUnsubscribed = false
  var cbIndex = this.observers.indexOf(cb)

  if (cbIndex !== -1) {
    this.observers.splice(cbIndex, 1)
    hasUnsubscribed = true
  }

  return hasUnsubscribed
}
