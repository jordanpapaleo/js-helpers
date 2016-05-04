var DomUtils = {}

DomUtils.findAncestor = function (el, className) {
  while (el.className.indexOf(className) === -1) {
    el = el.parentElement
  }

  return el
}
