const DomUtils = {}

DomUtils.findAncestor = function findAncestor (el, className) {
  while (el.className.indexOf(className) === -1) {
    el = el.parentElement
  }

  return el
}

DomUtils.readCookie = function readCookie (cname) {
  const name = `${cname}=`
  const cookieArray = document.cookie.split(';')

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i]

    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1)
    }

    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }

  return ''
}

export default DomUtils
