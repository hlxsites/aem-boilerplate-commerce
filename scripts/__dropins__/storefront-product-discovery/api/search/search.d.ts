import { ProductSearchResult, Scope, SearchVariables } from '../../data/models';

type SearchOptions = {
    scope?: Scope;
};
export declare const search: (variables: SearchVariables | null, options?: SearchOptions) => Promise<ProductSearchResult>;
export {};
//# sourceMappingURL=search.d.ts.map