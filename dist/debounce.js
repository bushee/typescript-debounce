import { OverridingArgumentsReducer } from "./arguments-reducer";
export function Debounce(options) {
    return function (target, propertyKey, descriptor) {
        var originalFunc = descriptor.value;
        var argumentsReducer = options.argumentsReducer || OverridingArgumentsReducer;
        delete descriptor.value;
        delete descriptor.writable;
        descriptor.get = function () {
            var debouncedFunction = debounceFunction(originalFunc, options.millisecondsDelay, argumentsReducer);
            Object.defineProperty(this, propertyKey, {
                value: debouncedFunction
            });
            return debouncedFunction;
        };
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
