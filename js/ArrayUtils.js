var ArrayUtils = {}

// Gets random index
ArrayUtils.getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)]
}

// clones an array
ArrayUtils.clone = function (array) {
  return array.slice(0)
}

export default ArrayUtils
