var NumberFormat = {}

NumberFormat.commaSeparated = function (value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export default NumberFormat
