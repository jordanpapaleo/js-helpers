/* var ObjUtils = {}

ObjUtils.valueEqual = function(object1, object2) {
    object1keys = <list of keys of object1>
    object2keys = <list of keys of object2>

    return false if length(object1keys) != length(object2keys)

    for(var key in object1keys) {

    }
    return false if key not in object2keys
    return false if typeof(object1[key]) != typeof(object2[key])

    if object1[key] is an object:
      keyEqual = valueEqual(object1[key], object2[key])
      return false if keyEqual != false

    if object1[key] is a primitive:
      return false if object1[key] != object2[key]

    return true
}

export default ObjUtils */
