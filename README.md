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
