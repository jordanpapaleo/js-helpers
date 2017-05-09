/*
 * @param fileQueue: array: of items to process
 * @param maxSimultaneous: int: the maximum simultaneous items that can be processed
 * @param processCb: function returning a promise: what to do with each item
 */
function manageQueue (fileQueue, maxSimultaneous = 3, processCb) {
  return new Promise((resolve, reject) => {
    let returnData = []
    let running = 0

    processQueue()

    function processQueue () {
      while (fileQueue.length && running < maxSimultaneous) {
        processCb(fileQueue.shift()).then(
          data => {
            returnData.push(data)
            checkQueue()
          },
          err => { reject(err) }
        )

        running++
      }
    }

    function checkQueue () {
      if (fileQueue.length) {
        running--
        processQueue()
      } else {
        resolve(returnData)
      }
    }
  })
}
