import { SearchVariables } from '../../data/models';

/**
 * SearchState manages the centralized search state and URL synchronization.
 * This is the single source of truth for search parameters.
 */
declare class SearchState {
    private state;
    private initialized;
    /**
     * Initialize state from URL on first load
     */
    initialize(): SearchVariables;
    /**
     * Get current state
     */
    getState(): SearchVariables;
    /**
     * Update state and sync to URL
     * Returns true if state changed (API call needed)
     */
    updateState(updates: Partial<SearchVariables>, syncUrl?: boolean, replaceFilters?: boolean): boolean;
    /**
     * Reset state
     */
    reset(): void;
    /**
     * Sync URL from current state
     */
    private syncUrlFromState;
    /**
     * Deduplicate filters by attribute
     * Later filters with the same attribute replace earlier ones, UNLESS the new filter is empty
     * Empty filters are discarded and don't override existing values
     */
    private deduplicateFilters;
    /**
     * Parse sort parameter from URL
     */
    private parseSortFromUrl;
    /**
     * Parse filter parameter from URL
     */
    private parseFiltersFromUrl;
    /**
     * Extract category from pathname
     */
    private getCategoryFromPath;
    /**
     * Merge category filter from path with existing filters
     */
    private mergeCategoryFilter;
    /**
     * Check if state has changed in meaningful ways
     */
    private hasStateChanged;
}
export declare const searchState: SearchState;
export {};
//# sourceMappingURL=searchState.d.ts.map