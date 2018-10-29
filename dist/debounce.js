export function Debounce(options) {
    return function (target, propertyKey, descriptor) {
        var originalFunc = descriptor.value;
        descriptor.value = debounceFunction(originalFunc, options.millisecondsDelay);
    };
}
function debounceFunction(func, delay) {
    var timeoutId;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            func.apply(void 0, args);
            timeoutId = void 0;
        }, delay);
    };
}
