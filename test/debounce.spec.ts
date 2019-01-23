import {AppendingArgumentsReducer, Debounce, DebounceOptions} from "../src";
import Spy = jasmine.Spy;

describe('@Debounce()', () => {
    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    describe('delay', () => {
        it('should not call debounced function until desired amount of time passes', () => {
            // given
            const {spy, debouncedMethod} = createTestInstance({millisecondsDelay: 100});

            // when
            debouncedMethod();
            jasmine.clock().tick(99);

            // then
            expect(spy).not.toHaveBeenCalled();
        });

        it('should call debounced function only after desired amount of time has passed', () => {
            // given
            const {spy, debouncedMethod} = createTestInstance({millisecondsDelay: 100});

            // when
            debouncedMethod();
            jasmine.clock().tick(100);

            // then
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('multiple calls', () => {
        it('should call debounced function only once if all calls were done before desired amount of time', () => {
            // given
            const {spy, debouncedMethod} = createTestInstance();

            // when
            debouncedMethod();
            debouncedMethod();
            debouncedMethod();
            jasmine.clock().tick(0);

            // then
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should call debounced function again when new call is done after desired amount of time', () => {
            // given
            const {spy, debouncedMethod} = createTestInstance({millisecondsDelay: 100});

            // when
            debouncedMethod();
            jasmine.clock().tick(100);
            debouncedMethod();
            jasmine.clock().tick(100);

            // then
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });

    describe('arguments', () => {
        it('should use arguments of last function call', () => {
            // given
            const {spy, debouncedMethod} = createTestInstance();

            // when
            debouncedMethod(1, 2, 3);
            debouncedMethod(4, 5, 6);
            jasmine.clock().tick(0);

            // then
            expect(spy).toHaveBeenCalledWith(4, 5, 6);
        });

        it('should reduce arguments of multiple calls using specified reducer', () => {
            // given
            const {spy, debouncedMethod} = createTestInstance({
                argumentsReducer: AppendingArgumentsReducer,
                millisecondsDelay: 0
            });

            // when
            debouncedMethod(1, 2, 3);
            debouncedMethod(4, 5, 6);
            jasmine.clock().tick(0);

            // then
            expect(spy).toHaveBeenCalledWith(1, 2, 3, 4, 5, 6);
        });

        it('should not retain reduced arguments when debounce is reset', () => {
            // given
            const {spy, debouncedMethod} = createTestInstance({
                argumentsReducer: AppendingArgumentsReducer,
                millisecondsDelay: 0
            });

            // when
            debouncedMethod(1, 2, 3);
            debouncedMethod(4, 5, 6);
            jasmine.clock().tick(0);
            debouncedMethod(7, 8, 9);
            jasmine.clock().tick(0);

            // then
            expect(spy).toHaveBeenCalledWith(1, 2, 3, 4, 5, 6);
            expect(spy).toHaveBeenCalledWith(7, 8, 9);
        });

        it('debounced method call on independent instances should handle arguments independently', () => {
            // given
            const {TestClass, spy} = createTestInstance();
            const instance1 = new TestClass();
            const instance2 = new TestClass();

            // when
            instance1.testMethod('abc');
            instance2.testMethod('def');
            jasmine.clock().tick(0);

            // then
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith('abc');
            expect(spy).toHaveBeenCalledWith('def');
        });
    });

    describe('this', () => {
        it('should retain "this" value', () => {
            // given
            const {TestClass} = createTestInstance();
            const instance = new TestClass();

            // when
            instance.testMethod(1, 2, 3);
            jasmine.clock().tick(0);

            // then
            expect(instance.lastCallArgs).toEqual([1, 2, 3]);
        });

        it('"this" value should not be fixed to original instance', () => {
            // given
            const {TestClass} = createTestInstance();
            const instance = new TestClass();
            const fakeInstance = {} as TestClass;

            // when
            instance.testMethod.call(fakeInstance, 1, 2, 3);
            jasmine.clock().tick(0);

            // then
            expect(fakeInstance.lastCallArgs).toEqual([1, 2, 3]);
        });

        it('debounced method call on independent instances should retain "this" independently', () => {
            // given
            const {TestClass} = createTestInstance();
            const instance1 = new TestClass();
            const instance2 = new TestClass();

            // when
            instance1.testMethod('abc');
            instance2.testMethod('def');
            jasmine.clock().tick(0);

            // then
            expect(instance1.lastCallArgs).toEqual(['abc']);
            expect(instance2.lastCallArgs).toEqual(['def']);
        });
    });
});

function createTestInstance(options: DebounceOptions<any> = {millisecondsDelay: 0}): DebouncedMethodCreationResult {
    const spy = jasmine.createSpy('testMethod');

    class TestClass {
        public lastCallArgs: any[];

        @Debounce(options)
        public testMethod(...args: any[]): void {
            this.lastCallArgs = args;
            spy(...args);
        }
    }

    const instance = new TestClass();
    return {
        TestClass,
        debouncedMethod: (...args: any[]) => instance.testMethod(...args),
        spy
    };
}

interface TestClass {
    lastCallArgs: any[]

    testMethod(...args: any[]): void
}

interface DebouncedMethodCreationResult {
    TestClass: { new(): TestClass },
    debouncedMethod: (...args: any[]) => void
    spy: Spy
}
