var ArrayUtils = {}

// Gets random index
ArrayUtils.getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)]
}

// clones an array
ArrayUtils.clone = function (array) {
  return array.slice(0)
  // return [].concat(array)
}

Array.sortShuffle = function () {
  shuffledNumbers.sort(function() {
    return 0.5 - Math.random()
  })
}

// Performs the Fisher Yates Sort Algorithm
ArrayUtils.shuffle = function (array) {
  var copiedArray = array.slice(0)

  var i = 0
  var j = 0
  var temp = null

  for (i = copiedArray.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = copiedArray[i]
    copiedArray[i] = copiedArray[j]
    copiedArray[j] = temp
  }

  return copiedArray
}

export default ArrayUtils
