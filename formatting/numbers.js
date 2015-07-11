// Comma separated numbers
var blar = 1000000;
var plop = blar.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
console.log(plop)
