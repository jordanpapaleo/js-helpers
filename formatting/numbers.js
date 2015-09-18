
var NumberFormats = {};

// Comma separated numbers
NumberFormats.toCSV = function(n) {
    //ex: 1,000,000
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default NumberFormats;