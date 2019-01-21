export declare type ArgumentsReducer<T> = (previousArgs: T[], newArgs: T[]) => T[];
export declare function AppendingArgumentsReducer<T>(previousArgs: T[], newArgs: T[]): T[];
export declare function OverridingArgumentsReducer<T>(previousArgs: T[], newArgs: T[]): T[];
