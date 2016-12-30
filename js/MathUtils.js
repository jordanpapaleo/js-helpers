const MathUtil = {}

MathUtil.randomRange = function randomRange (min, max) {
  return Math.random() * (max - min) + min
}

MathUtil.randomRangeInt = function randomRangeInt (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

MathUtil.filterInt = function filterInt (value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value)
  }

  return NaN
}

MathUtil.filterFloat = function filterFloat (value) {
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Number(value)
  }

  return NaN
}

MathUtil.round = function round (val, place) {
  return +(val.toFixed(place))
}

export default MathUtil
