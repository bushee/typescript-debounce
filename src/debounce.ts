export function Debounce<F extends NotReturningFunction>(options: DebounceOptions): GenericMethodDecorator<F> {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<F>) => {
        const originalFunc = descriptor.value!!;
        descriptor.value = debounceFunction(originalFunc, options.millisecondsDelay);
    };
}

export interface DebounceOptions {
    millisecondsDelay: number
}

export type NotReturningFunction = (...args: any[]) => void;

export type GenericMethodDecorator<T> = (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

function debounceFunction<F extends NotReturningFunction>(func: F, delay: number): F {
    let timeoutId: number | undefined;
    return function (...args: any[]): void {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(this, args);
            timeoutId = void 0;
        }, delay);
    } as F;
}
