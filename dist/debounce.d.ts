import { ArgumentsReducer } from "./arguments-reducer";
export declare function Debounce<T, F extends NotReturningFunction<T>>(options: DebounceOptions<T>): GenericMethodDecorator<F>;
export interface DebounceOptions<T> {
    argumentsReducer?: ArgumentsReducer<T>;
    millisecondsDelay: number;
}
export declare type NotReturningFunction<T> = (...args: T[]) => void;
export declare type GenericMethodDecorator<T> = (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
