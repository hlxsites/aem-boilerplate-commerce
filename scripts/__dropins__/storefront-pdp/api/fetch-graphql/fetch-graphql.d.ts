/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2023 Adobe
 * All Rights Reserved.
 * __________________
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 */
export declare const setEndpoint: (endpoint: string) => void, setFetchGraphQlHeader: (key: string, value: string | null) => void, removeFetchGraphQlHeader: (key: string) => void, setFetchGraphQlHeaders: (header: import('@adobe-commerce/fetch-graphql', { assert: { "resolution-mode": "import" } }).Header | ((prev: import('@adobe-commerce/fetch-graphql', { assert: { "resolution-mode": "import" } }).Header) => import('@adobe-commerce/fetch-graphql', { assert: { "resolution-mode": "import" } }).Header)) => void, getFetchGraphQlHeader: (key: string) => string | null | undefined, fetchGraphQl: <T = any>(query: string, options?: import('@adobe-commerce/fetch-graphql', { assert: { "resolution-mode": "import" } }).FetchOptions | undefined) => Promise<{
    errors?: import('@adobe-commerce/fetch-graphql', { assert: { "resolution-mode": "import" } }).FetchQueryError | undefined;
    data: T;
}>, getConfig: () => {
    endpoint: string | undefined;
    fetchGraphQlHeaders: import('@adobe-commerce/fetch-graphql', { assert: { "resolution-mode": "import" } }).Header;
};
//# sourceMappingURL=fetch-graphql.d.ts.map