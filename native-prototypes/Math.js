Math.prototype.randomRange = function(min, max) {
	return Math.random() * (max - min) + min;
};

Math.prototype.randomRangeInt = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};