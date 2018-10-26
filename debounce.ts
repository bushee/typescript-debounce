export function Debounce<T, U>(options: DebounceOptions<T, U>): GenericMethodDecorator<NotReturningFunction> {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<NotReturningFunction>) => {
        const originalFunc = descriptor.value;
        descriptor.value = debounceFunction(originalFunc, options.millisecondsDelay);
    };
}

export interface DebounceOptions<T, U> {
    millisecondsDelay: number
}

export type NotReturningFunction = (...args: any[]) => void;

export type GenericMethodDecorator<T> = (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

function debounceFunction(func: NotReturningFunction, delay: number): NotReturningFunction {
    let timeoutId: any;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = void 0;
        }, delay);
    };
}
