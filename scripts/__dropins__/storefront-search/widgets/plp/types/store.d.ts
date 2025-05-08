import { QueryContextInput, RedirectRouteFunc, StoreDetailsConfig } from './interface';

export interface StoreDetails {
    environmentId: string;
    environmentType: string;
    websiteCode: string;
    storeCode: string;
    storeViewCode: string;
    config: StoreDetailsConfig;
    context?: QueryContextInput;
    apiUrl: string;
    apiKey: string;
    route?: RedirectRouteFunc;
    searchQuery?: string;
    customerGroup?: string;
    type?: string;
    defaultHeaders?: any;
    searchHeaders?: any;
}
//# sourceMappingURL=store.d.ts.map