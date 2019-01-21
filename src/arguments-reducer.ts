export type ArgumentsReducer<T> = (previousArgs: T[], newArgs: T[]) => T[]

export function AppendingArgumentsReducer<T>(previousArgs: T[], newArgs: T[]): T[] {
    return [...previousArgs, ...newArgs];
}

export function OverridingArgumentsReducer<T>(previousArgs: T[], newArgs: T[]): T[] {
    return newArgs;
}
