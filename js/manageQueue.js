/*
 * @param fileQueue: array: of items to do process
 * @param uploadLimit: int: the maximum simultaneous items that can be processes
 * @param processCb: function returning a promise: what to do with each item
 */
function manageQueue (fileQueue, uploadLimit = 3, processCb) {
  return new Promise((resolve, reject) => {
    let returnData = []
    let running = 0

    processQueue()

    function processQueue () {
      while (fileQueue.length && running < uploadLimit) {
        processCb(fileQueue.shift()).then(
          data => {
            returnData.push(data)
            checkQueue()
          },
          err => { throw (err) }
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
