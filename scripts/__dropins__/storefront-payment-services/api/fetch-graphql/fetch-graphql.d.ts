import { FetchOptions, FetchQueryError } from '@adobe-commerce/fetch-graphql';

declare const fetchGraphQlInternal: <T = any>(query: string, options?: FetchOptions | undefined) => Promise<{
    errors?: FetchQueryError | undefined;
    data: T;
}>, setEndpoint: (endpoint: string) => void, setFetchGraphQlHeader: (key: string, value: string | null) => void, removeFetchGraphQlHeader: (key: string) => void, setFetchGraphQlHeaders: (header: import('@adobe-commerce/fetch-graphql').Header | ((prev: import('@adobe-commerce/fetch-graphql').Header) => import('@adobe-commerce/fetch-graphql').Header)) => void, getConfig: () => {
    endpoint: string | undefined;
    fetchGraphQlHeaders: import('@adobe-commerce/fetch-graphql').Header;
};
export { setEndpoint, setFetchGraphQlHeader, removeFetchGraphQlHeader, setFetchGraphQlHeaders, getConfig, };
export type { FetchOptions, FetchQueryError };
/**
 * `FetchOptions` plus per-request `headers`
 */
export type FetchGraphQlOptions = FetchOptions & {
    headers?: Record<string, string>;
};
export declare function fetchGraphQl(query: string, options?: FetchGraphQlOptions): ReturnType<typeof fetchGraphQlInternal>;
//# sourceMappingURL=fetch-graphql.d.ts.map