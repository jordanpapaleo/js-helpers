class Observer {
  _observers = []

  subscribe(cb) {
    let hasSubscribed = false

    if (cb instanceof Function) {
      this._observers.push(cb)
      hasSubscribed = true
    } else {
      console.debug('Callback is not a function')
    }

    return hasSubscribed
  }

  update(value) {
    this._observers.forEach((observer) => {
      observer(value)
    })
  }
}
