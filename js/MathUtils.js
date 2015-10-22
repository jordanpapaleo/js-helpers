var MathUtil = {}

MathUtil.randomRange = function (min, max) {
  return Math.random() * (max - min) + min
}

MathUtil.randomRangeInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

MathUtil.filterInt = function (value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value)
  }

  return NaN
}

MathUtil.filterFloat = function (value) {
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Number(value)
  }

  return NaN
}

MathUtil.round = function (val, place) {
  return +(val.toFixed(place))
}

export default MathUtil
