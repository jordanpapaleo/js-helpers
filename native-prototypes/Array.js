// returns an random value from an array
/*
var myArr = [1, 2, 3];
var randomValue = myArr.getRandom
*/
Array.prototype.getRandom = function() {
	return this[Math.floor(Math.random() * this.length)];
};

// clones an array
/*
var myArr = [1, 2, 3];
var myNewArr = myArr.clone()
*/
Array.prototype.clone = function() {
	return this.slice(0);
};