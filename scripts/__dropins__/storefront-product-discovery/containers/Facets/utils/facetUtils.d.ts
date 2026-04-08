import { SearchFacet, SearchFilter } from '../../../data/models/api';
import { Product } from '../../../data/models/product';

declare const getFilterSelection: (facet: SearchFacet) => {
    attribute: string;
    range: {
        from: number | undefined;
        to: number | undefined;
    };
} | {
    attribute: string;
    in: string[];
} | null | undefined;
/**
 * Returns whether a facet bucket is selected according to the given filter.
 * Handles range buckets, scalar/category in-list selection, and category parent selection when a child is selected.
 */
declare const isBucketSelected: (bucket: any, facet: SearchFacet, selectedFilter: SearchFilter | undefined) => boolean;
declare const getCurrencyType: (items: Product[]) => string;
declare const getBucketLabel: (bucket: any, facet: SearchFacet, currency: string | null) => any;
export { getBucketLabel, getCurrencyType, getFilterSelection, isBucketSelected };
//# sourceMappingURL=facetUtils.d.ts.map