export declare function Debounce<F extends NotReturningFunction>(options: DebounceOptions): GenericMethodDecorator<F>;
export interface DebounceOptions {
    millisecondsDelay: number;
}
export declare type NotReturningFunction = (...args: any[]) => void;
export declare type GenericMethodDecorator<T> = (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
