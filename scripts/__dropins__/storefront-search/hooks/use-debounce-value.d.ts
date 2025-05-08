import { DebouncedState } from './use-debounce-callback';

type UseDebounceValueOptions<T> = {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
    equalityFn?: (left: T, right: T) => boolean;
};
export declare function useDebounceValue<T>(initialValue: T | (() => T), delay: number, options?: UseDebounceValueOptions<T>): [T, DebouncedState<(value: T) => void>];
export {};
//# sourceMappingURL=use-debounce-value.d.ts.map