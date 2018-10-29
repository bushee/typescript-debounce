export declare function Debounce<T, U>(options: DebounceOptions<T, U>): GenericMethodDecorator<NotReturningFunction>;
export interface DebounceOptions<T, U> {
    millisecondsDelay: number;
}
export declare type NotReturningFunction = (...args: any[]) => void;
export declare type GenericMethodDecorator<T> = (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
