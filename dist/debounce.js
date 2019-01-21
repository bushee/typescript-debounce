import { OverridingArgumentsReducer } from "./arguments-reducer";
export function Debounce(options) {
    return function (target, propertyKey, descriptor) {
        var originalFunc = descriptor.value;
        var argumentsReducer = options.argumentsReducer || OverridingArgumentsReducer;
        descriptor.value = debounceFunction(originalFunc, options.millisecondsDelay, argumentsReducer);
    };
}
function debounceFunction(func, delay, reducer) {
    var timeoutId;
    var aggregatedArgs = [];
    return function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        aggregatedArgs = reducer(aggregatedArgs, args);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            func.apply(_this, aggregatedArgs);
            timeoutId = void 0;
            aggregatedArgs = [];
        }, delay);
    };
}
