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

function loadjscssfile(filename, filetype){
  if (filetype === 'js') {
    var fileref=document.createElement('script')
    fileref.setAttribute('type','text/javascript')
    fileref.setAttribute('src', filename)
    fileref.setAttribute('async', 'async')
    fileref.setAttribute('defer', 'defer')
  } else if (filetype === 'css'){
    var fileref=document.createElement('link')
    fileref.setAttribute('rel', 'stylesheet')
    fileref.setAttribute('type', 'text/css')
    fileref.setAttribute('href', filename)
  }
  if (typeof fileref !== 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(fileref)
  }
}
