# typescript-debounce

> Debounce your method with a simple decoration

This module provides a decorator that enables you to debounce any typescript method.
Specify delay in milliseconds. Any call to debounced method will be delayed by specified time amount. Should it be called before the timeout, timer will be reset and only the latest invocation will be executed.

**Note:** due to limitations, only void-returning functions may be debounced. `@DebouncePromise` is to be implemented to handle returning functions debounce. 

## Getting Started

```shell
npm install --save typescript-debounce
```

or

```
yarn add typescript-debounce
```

Once the module has been installed, just import it and decorate any method:

```js
import {Debounce} from 'typescript-debounce';

class MyClass {
    @Debounce({millisecondsDelay: 1000})
    public someMethod(arg1: string, arg2: number): void {
        // ...
        console.log('arg1: ', arg1, 'arg2:', arg2);
    }
}
```

```js
const instance = new MyClass();
instance.someMethod('a', 15);
// 300 ms later
instance.someMethod('foo', 42);

// after 1000 ms will display
// arg1: "foo" arg2: 42
```

## Configuration
Available options:

- `millisecondsDelay` - amount of time (in ms) that has to pass since last function call to actually invoke the debounced code
- `argumentsReducer` *(optional)* - reducer function to handle multiple arguments lists passed in many calls; you may implement any reducer function manually, yet these are provided by this module:
    - `OverridingArgumentsReducer` *(default, if none specified)* - use only arguments from the last call
    - `AppendingArgumentsReducer` - append arguments of all subsequent method calls; since the actual arguments list lenght is arbitrary, the only sensible way to use it is when a function with "rest" argument is decorated

    Reducer is a function that accepts two arguments, containing both previous and current arguments, and produces resulting arguments list. Its interface is as follows:
    ```js
    ArgumentsReducer<T> = (previousArgs: T[], newArgs: T[]) => T[]
    ```
