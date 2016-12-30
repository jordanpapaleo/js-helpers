function scrollToY (to, duration, callback) {
  Math.easeInOutQuad = function easeInOutQuad (t, b, c, d) {
    t /= d / 2
    if (t < 1) {
      return c / 2 * t * t + b
    }
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  Math.easeInCubic = function easeInCubic (t, b, c, d) {
    var tc = (t /= d) * t * t
    return b + c * (tc)
  }

  Math.inOutQuintic = function inOutQuintic(t, b, c, d) {
    var ts = (t /= d) * t
    var tc = ts * t
    return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc)
  }

  var requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) }
  })()

  // because it's so difficult to detect the scrolling element, just move them all
  function move (amount) {
    document.documentElement.scrollTop = amount
    document.body.parentNode.scrollTop = amount
    document.body.scrollTop = amount
  }

  function position () {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
  }

  var start = position()
  var change = to - start
  var currentTime = 0
  var increment = 16
  duration = (typeof (duration) === 'undefined') ? 500 : duration
  var animateScroll = function () {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }

  animateScroll()
}
