function loadScript(url, cb){
  var script = document.createElement('script')
  script.type = 'text/javascript'

  if (script.readyState){  // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null

        if (cb && cb instanceof Function) {
          cb()
        }
      }
    }
  } else {
    script.onload = function () {
      if (cb && cb instanceof Function) {
        cb()
      }
    }
  }

  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}
