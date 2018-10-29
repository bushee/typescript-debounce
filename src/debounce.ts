export function Debounce(options: DebounceOptions): GenericMethodDecorator<NotReturningFunction> {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<NotReturningFunction>) => {
        const originalFunc = descriptor.value!!;
        descriptor.value = debounceFunction(originalFunc, options.millisecondsDelay);
    };
}

export interface DebounceOptions {
    millisecondsDelay: number
}

export type NotReturningFunction = (...args: any[]) => void;

export type GenericMethodDecorator<T> = (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

function debounceFunction(func: NotReturningFunction, delay: number): NotReturningFunction {
    let timeoutId: any;
    return function (...args: any[]): any {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
            timeoutId = void 0;
        }, delay);
    };
}
