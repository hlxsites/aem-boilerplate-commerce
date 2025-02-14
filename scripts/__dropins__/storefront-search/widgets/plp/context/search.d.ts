import { FunctionComponent } from 'preact/compat';
import { FacetFilter, ProductSearchSortInput } from '../types';

interface SearchContextProps {
    phrase: string;
    categoryPath: string;
    filters: FacetFilter[];
    sort: ProductSearchSortInput[];
    setPhrase: any;
    setCategoryPath: any;
    setFilters: any;
    setSort: any;
    setCategoryNames: any;
    filterCount: number;
    categoryNames: {
        name: string;
        value: string;
        attribute: string;
    }[];
    createFilter: (filter: FacetFilter) => void;
    updateFilter: (filter: FacetFilter) => void;
    updateFilterOptions(filter: FacetFilter, option: string): void;
    removeFilter: (name: string, option?: string) => void;
    clearFilters: () => void;
}
export declare const SearchContext: import('preact').Context<SearchContextProps>;
declare const SearchProvider: FunctionComponent;
declare const useSearch: () => SearchContextProps;
export { SearchProvider, useSearch };
//# sourceMappingURL=search.d.ts.map