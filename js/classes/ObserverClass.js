class Observer {
  constructor () {
    this._observers = []
    this._observable = null
  }

  subscribe (cb) {
    var hasSubscribed = false

    if(cb instanceof Function) {
      this._observers.push(cb)
      hasSubscribed = true
    } else {
      console.debug('Callback is not a function')
    }

    return hasSubscribed
  }

  update (observable) {
    var hasUpdated = false

    if(observable) {
      this._observable = _observable
      this.refresh()
      hasUpdated = true
    } else {
      console.debug('Null observable')
    }

    return hasUpdated;
  }

  refresh () {
    if(this._observable) {
      for (let observer of this._observers) {
        observer(this._observable)
      }
    }
  }

  reset () {
    this._observable = null
  }
}

export default Observer

