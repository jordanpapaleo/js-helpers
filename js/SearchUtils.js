var SearchUtils = {}

SearchUtils.deepSearch = function (collection, value) {
  var matched
  var i = collection.length

  while (i--) {
    var item = collection[i]

    if (item.id === value) {
      matched = item
      break
    }

    if (item.children.length > 0) {
      var tempMatch = this.deepSearch(item.children, value)
      if (tempMatch) {
        matched = tempMatch
        break
      }
    }
  }

  return matched
}

export default SearchUtils
