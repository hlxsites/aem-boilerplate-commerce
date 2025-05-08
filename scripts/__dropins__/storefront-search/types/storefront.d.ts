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
    route: (params: StorefrontRouteParams) => string;
    searchRoute?: SearchRoute;
};
export type StorefrontConfig = {
    pageSize: number;
    perPageConfig: PerPageConfig;
    minQueryLength: number;
    currencySymbol: string;
    currencyRate: number;
    displayOutOfStock: boolean;
    allowAllProducts: boolean;
};
export type PerPageConfig = {
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
    route: string;
    query: string;
};
//# sourceMappingURL=storefront.d.ts.map