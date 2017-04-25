export function getIntersects (setOne, setTwo, by) {
  return setOne.filter((thingOne) => {
    return setTwo.filter((thingTwo) => {
      return thingOne[by] === thingTwo[by]
    })
  })
}

export function getDifference (setOne, setTwo, by) {
  return setOne.filter((thingOne) => {
    return setTwo.filter((thingTwo) => {
      return thingOne[by] !== thingTwo[by]
    })
  })
}
