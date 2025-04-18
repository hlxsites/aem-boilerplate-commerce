import { FunctionComponent } from 'preact';
import { Facet } from '../../types/interface';

interface CategoryFiltersProps {
    loading: boolean;
    pageLoading: boolean;
    totalCount: number;
    facets: Facet[];
    categoryName: string;
    phrase: string;
    showFilters: boolean;
    setShowFilters: (showFilters: boolean) => void;
    filterCount: number;
}
export declare const CategoryFilters: FunctionComponent<CategoryFiltersProps>;
export {};
//# sourceMappingURL=CategoryFilters.d.ts.map