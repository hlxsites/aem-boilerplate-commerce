import { SearchFacet, SearchFilter } from '../../../data/models/api';

type MapRef<T> = {
    current: T;
};
/**
 * Merges raw category buckets into the ref. Once we have data for a path, never overwrite it with blank (preserve initial tree).
 */
export declare function mergeRawCategoriesBuckets(rawBuckets: any[] | undefined, ref: MapRef<Map<string, any>>): void;
/**
 * Persists category buckets into the ref. Once we have data for a path, never overwrite with blank so initial tree data survives subsequent API calls.
 */
export declare function persistCategoryTree(buckets: any[] | undefined, ref: MapRef<Map<string, any>>): void;
/**
 * Fills the ref with known children per parent from category facets (for sibling persistence).
 */
export declare function trackKnownChildrenForFacets(facets: SearchFacet[] | undefined, ref: MapRef<Map<string, Map<string, any>>>): void;
/**
 * Merges known siblings into the bucket list when a child category is selected.
 * getKnownChildren(parentPath) should return the stored child buckets for that parent.
 */
export declare function mergeKnownSiblings(buckets: any[], selectedCategories: string[], getKnownChildren: (parentPath: string) => Map<string, any> | undefined): any[];
/**
 * Restores bucket names and inserts missing buckets from a cached tree for the given paths.
 * getCached(path) should return the cached bucket data for that path.
 */
export declare function restoreFromTree(buckets: any[], pathsToRestore: string[], getCached: (path: string) => any | undefined): any[];
/**
 * Outdents children whose parent is not present (treats them as top-level).
 * isPathPresent(path) and isPathInTree(path) determine whether a path exists in current buckets or in the persisted tree.
 */
export declare function outdentChildrenWithoutParent(buckets: any[], isPathPresent: (path: string) => boolean, isPathInTree: (path: string) => boolean): any[];
/**
 * Processes category facet buckets: merges known siblings, restores from tree, then outdents children without parent.
 * Uses the given refs for known children and original category tree.
 */
export declare function processCategoryBuckets(buckets: any[], filterList: SearchFilter[] | undefined, hasCategoryFilter: boolean, knownChildrenRef: MapRef<Map<string, Map<string, any>>>, originalCategoryTreeRef: MapRef<Map<string, any>>): any[];
export {};
//# sourceMappingURL=categoryFacetUtils.d.ts.map