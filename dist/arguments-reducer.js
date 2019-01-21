export function AppendingArgumentsReducer(previousArgs, newArgs) {
    return previousArgs.concat(newArgs);
}
export function OverridingArgumentsReducer(previousArgs, newArgs) {
    return newArgs;
}
