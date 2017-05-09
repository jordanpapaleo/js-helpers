export default class Queue {
  /*
   * @param fileQueue: array of items to process
   * @param maxSimultaneous: int for the maximum simultaneous items that can be processed
   */
  constructor (queue, maxSimultaneous = 3) {
    this.queue = queue
    this.maxSimultaneous = maxSimultaneous
  }

  addItem (item) {
    this.queue.push(item)
  }

  /*
   * @param processCb: function returning a promise that does the thing
   */
  processQueue (processCb) {
    const {queue, maxSimultaneous} = this
    return new Promise((resolve, reject) => {
      let returnData = []
      let running = 0

      updateQueue()

      function updateQueue () {
        while (queue.length && running < maxSimultaneous) {
          processCb(queue.shift()).then(
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
        if (queue.length) {
          running--
          updateQueue()
        } else {
          resolve(returnData)
        }
      }
    })
  }
}
