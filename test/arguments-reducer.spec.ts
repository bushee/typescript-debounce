import {AppendingArgumentsReducer, OverridingArgumentsReducer} from "../src";

describe('AppendingArgumentsReducer()', () => {
    it('should return new arguments when previous arguments are empty', () => {
        // given
        const previousArgs: Array<string | number> = [];
        const newArgs = [1, 'a'];

        // when
        const result = AppendingArgumentsReducer(previousArgs, newArgs);

        // then
        expect(result).toEqual([1, 'a']);
    });

    it('should append new arguments to previous arguments', () => {
        // given
        const previousArgs = [3, 'c'];
        const newArgs = [1, 'a'];

        // when
        const result = AppendingArgumentsReducer(previousArgs, newArgs);

        // then
        expect(result).toEqual([3, 'c', 1, 'a']);
    });
});

describe('OverridingArgumentsReducer()', () => {
    it('should return new arguments when previous arguments are empty', () => {
        // given
        const previousArgs: Array<string | number> = [];
        const newArgs = [1, 'a'];

        // when
        const result = OverridingArgumentsReducer(previousArgs, newArgs);

        // then
        expect(result).toEqual([1, 'a']);
    });

    it('should return only new arguments despite the previous arguments', () => {
        // given
        const previousArgs = [3, 'c'];
        const newArgs = [1, 'a'];

        // when
        const result = OverridingArgumentsReducer(previousArgs, newArgs);

        // then
        expect(result).toEqual([1, 'a']);
    });
});