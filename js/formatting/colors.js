function rgb2hex(rgb) {
  const matchedRgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)
  return (matchedRgb && matchedRgb.length === 4)
    ? `#${("0" + parseInt(rgb[1], 10).toString(16)).slice(-2)}${("0" + parseInt(rgb[2], 10).toString(16)).slice(-2)}${("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)}`
    : ''
}

