import {Debounce, DebounceOptions} from "../src/debounce";
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
            const {spy, debouncedMethod} = createDebouncedMethod({millisecondsDelay: 100});

            // when
            debouncedMethod();
            jasmine.clock().tick(99);

            // then
            expect(spy).not.toHaveBeenCalled();
        });

        it('should call debounced function only after desired amount of time has passed', () => {
            // given
            const {spy, debouncedMethod} = createDebouncedMethod({millisecondsDelay: 100});

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
            const {spy, debouncedMethod} = createDebouncedMethod();

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
            const {spy, debouncedMethod} = createDebouncedMethod({millisecondsDelay: 100});

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
            const {spy, debouncedMethod} = createDebouncedMethod();

            // when
            debouncedMethod(1, 2, 3);
            debouncedMethod(4, 5, 6);
            jasmine.clock().tick(0);

            // then
            expect(spy).toHaveBeenCalledWith(4, 5, 6);
        });
    });

    describe('this', () => {
        it('should retain "this" value', () => {
            // given
            class TestClass {
                public lastCallArgs: any[];

                @Debounce({millisecondsDelay: 0})
                public testMethod(...args: any[]): void {
                    this.lastCallArgs = args;
                }
            }

            const instance = new TestClass();

            // when
            instance.testMethod(1, 2, 3);
            jasmine.clock().tick(0);

            // then
            expect(instance.lastCallArgs).toEqual([1, 2, 3]);
        });
    });
});

function createDebouncedMethod(options: DebounceOptions = {millisecondsDelay: 0}): DebouncedMethodCreationResult {
    const spy = jasmine.createSpy('testMethod');

    class TestClass {
        @Debounce(options)
        public testMethod(...args: any[]): void {
            spy(...args);
        }
    }

    const instance = new TestClass();
    return {
        debouncedMethod: instance.testMethod,
        spy
    };
}

interface DebouncedMethodCreationResult {
    debouncedMethod: (...args: any[]) => void
    spy: Spy
}
