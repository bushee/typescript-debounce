import {OverridingArgumentsReducer, ArgumentsReducer} from "./arguments-reducer";

export function Debounce<T, F extends NotReturningFunction<T>>(options: DebounceOptions<T>): GenericMethodDecorator<F> {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<F>) => {
        const originalFunc = descriptor.value!!;
        const argumentsReducer = options.argumentsReducer || OverridingArgumentsReducer;
        descriptor.value = debounceFunction(originalFunc, options.millisecondsDelay, argumentsReducer);
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
