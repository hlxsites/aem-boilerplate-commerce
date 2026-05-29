import { FunctionComponent } from 'preact';

export type Container<T, D = {
    [key: string]: any;
}> = FunctionComponent<T & {
    initialData?: D;
}> & {
    getInitialData?: (props: T) => Promise<D>;
    displayName?: string;
};
//# sourceMappingURL=types.d.ts.map