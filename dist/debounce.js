export function Debounce(options) {
    return function (target, propertyKey, descriptor) {
        var originalFunc = descriptor.value;
        descriptor.value = debounceFunction(originalFunc, options.millisecondsDelay);
    };
}
function debounceFunction(func, delay) {
    var timeoutId;
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            func.apply(_this, args);
            timeoutId = void 0;
        }, delay);
    };
}
