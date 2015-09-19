var MathUtils = {};

MathUtils.randomRange = function(min, max) {
    return Math.random() * (max - min) + min;
};

MathUtils.randomRangeInt = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

export default MathUtils;