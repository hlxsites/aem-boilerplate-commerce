export type StorefrontDetails = {
    appType: "eds" | "legacy";
    environmentId: string;
    environmentType: "testing" | "sandbox" | "production";
    apiKey: string;
    apiUrl: string;
    websiteCode: string;
    storeCode: string;
    storeViewCode: string;
    config: StorefrontConfig;
    context?: StorefrontContext;
    route(params: StorefrontRouteParams): string;
    searchRoute?: SearchRoute;
};
export type StorefrontConfig = {
    pageSize: number;
    perPageConfig: PerPageConfig;
    /** a number as a string */
    minQueryLength: number;
    currencySymbol: string;
    currencyRate: number;
    displayOutOfStock: boolean;
    allowAllProducts: boolean;
};
export type PerPageConfig = {
    /** Page Sizes are comma seperated string e.g. '12,24,36' */
    pageSizeOptions: number[];
    defaultPageSizeOption: number;
};
export type StorefrontContext = {
    customerGroup: string;
};
export type StorefrontRouteParams = {
    sku: string;
    urlKey: string;
};
export type SearchRoute = {
    /** default '/search' */
    route: string;
    /** default 'q' */
    query: string;
};
//# sourceMappingURL=storefront.d.ts.map