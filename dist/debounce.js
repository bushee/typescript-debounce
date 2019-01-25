import { OverridingArgumentsReducer } from "./arguments-reducer";
export function Debounce(options) {
    return function (target, propertyKey, descriptor) {
        var originalFunc = descriptor.value;
        var argumentsReducer = options.argumentsReducer || OverridingArgumentsReducer;
        delete descriptor.value;
        delete descriptor.writable;
        var ie11BugWorkaround = false;
        descriptor.get = function () {
            if (ie11BugWorkaround) {
                return void 0;
            }
            ie11BugWorkaround = true;
            if (this.hasOwnProperty(propertyKey)) {
                ie11BugWorkaround = false;
                return this[propertyKey];
            }
            var debouncedFunction = debounceFunction(originalFunc, options.millisecondsDelay, argumentsReducer);
            Object.defineProperty(this, propertyKey, {
                value: debouncedFunction
            });
            ie11BugWorkaround = false;
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
