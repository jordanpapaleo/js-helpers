import moment from 'moment'

module.exports = {
  truncate (string) {
    return (string.length > 5) ? string.substring(0, 100) + '...' : string
  },
  tryParseBool (val) {
    if (val && typeof (val) === 'boolean') {
      return val
    } else {
      return false
    }
  },
  tryParseString (val) {
    if (val && typeof (val) === 'string') {
      return val
    } else {
      return ''
    }
  },
  currency (num, symbol = '$') {
    if (typeof num === 'string') {
      num = this.tryParseFloat(num)
    }

    if (!num) {
      return '$0'
    }

    return (num) ? symbol + (num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) : symbol
  },
  tryParseFloat (val) {
    const parsedNum = parseFloat(val)
    return (!isNaN(parsedNum)) ? parsedNum : false
  },
  tryParseInt (val) {
    const parsedNum = parseFloat(val)
    return (!isNaN(parsedNum)) ? parsedNum : false
  },
  commaSeparated (value) {
    return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  },
  snakeToCamel (string) {
    return string.replace(/(\_\w)/g, (m) => {
      return m[1].toUpperCase()
    })
  },
  date (date) {
    if (date instanceof Date) {
      const m = moment(date)
      return m.format('MMM Do YYYY')
    } else {
      return date
    }
  },
  time (date) {
    // if (date instanceof Date) {
    const m = moment.utc(date)
    return m.format('LT')
    // } else {
    //   return date
    // }
  },
  timeAgo (date, hourDuration) {
    if (date instanceof Date) {
      const time = moment(date)
      const now = moment()
      const duration = moment.duration(now.diff(time))
      const hours = duration.asHours()
      const minutes = duration.asMinutes()

      if (minutes < 1) {
        return 'Just now'
      } else if (minutes < 60) {
        const minute = Math.round(minutes)
        return `${minute} minute${(minute > 1) ? 's' : ''} ago`
      } else if (hours <= hourDuration) {
        const hour = Math.round(hours)
        return `${hour} hour${(hour > 1) ? 's' : ''} ago`
      } else {
        return time.format('MM-DD-YY')
      }
    } else {
      return date
    }
  }
}
