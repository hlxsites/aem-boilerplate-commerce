type DebounceOptions = {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
};
type ControlFunctions = {
    cancel: () => void;
    flush: () => void;
    isPending: () => boolean;
};
export type DebouncedState<T extends (...args: any) => ReturnType<T>> = ((...args: Parameters<T>) => ReturnType<T> | undefined) & ControlFunctions;
export declare function useDebounceCallback<T extends (...args: any) => ReturnType<T>>(func: T, delay?: number, options?: DebounceOptions): DebouncedState<T>;
export {};
//# sourceMappingURL=use-debounce-callback.d.ts.map