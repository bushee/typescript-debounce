import {ArgumentsReducer, OverridingArgumentsReducer} from "./arguments-reducer";

export function Debounce<T, F extends NotReturningFunction<T>>(options: DebounceOptions<T>): GenericMethodDecorator<F> {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<F | undefined>) => {
        const originalFunc = descriptor.value!!;
        const argumentsReducer = options.argumentsReducer || OverridingArgumentsReducer;
        delete descriptor.value;
        delete descriptor.writable;
        let ie11BugWorkaround = false;
        descriptor.get = function (): F | undefined {
            if (ie11BugWorkaround) {
                // workaround for IE11 bug reported at https://github.com/medikoo/es6-symbol/issues/12
                return void 0;
            }
            ie11BugWorkaround = true;
            if (this.hasOwnProperty(propertyKey)) {
                // workaround for weird behaviour noticed randomly in phantomJS for some projects
                ie11BugWorkaround = false;
                return this[propertyKey];
            }
            const debouncedFunction = debounceFunction(originalFunc, options.millisecondsDelay, argumentsReducer);
            Object.defineProperty(this, propertyKey, {
                value: debouncedFunction
            });
            ie11BugWorkaround = false;
            return debouncedFunction;
        };
    };
}

export interface DebounceOptions<T> {
    argumentsReducer?: ArgumentsReducer<T>
    millisecondsDelay: number
}

export type NotReturningFunction<T> = (...args: T[]) => void;

export type GenericMethodDecorator<T> = (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

function debounceFunction<T, F extends NotReturningFunction<T>>(func: F, delay: number, reducer: ArgumentsReducer<T>): F {
    let timeoutId: number | undefined;
    let aggregatedArgs: T[] = [];
    return function (...args: T[]): void {
        aggregatedArgs = reducer(aggregatedArgs, args);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, aggregatedArgs);
            timeoutId = void 0;
            aggregatedArgs = [];
        }, delay);
    } as F;
}
