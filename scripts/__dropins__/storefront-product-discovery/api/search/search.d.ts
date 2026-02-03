import { ProductSearchResult, Scope, SearchVariables } from '../../data/models';

type SearchOptions = {
    scope?: Scope;
    syncUrl?: boolean;
    replaceFilters?: boolean;
};
/**
 * Performs a product search with the given parameters.
 *
 * State Management:
 * - For main search (scope=undefined): Uses centralized searchState for state management
 * - For scoped searches (scope='popover'): Operates independently without state management
 *
 * @param request - Search parameters. Pass null to clear results.
 * @param options - Search options including scope and URL sync preference
 */
export declare const search: (request: SearchVariables | null, options?: SearchOptions) => Promise<ProductSearchResult>;
export {};
//# sourceMappingURL=search.d.ts.map