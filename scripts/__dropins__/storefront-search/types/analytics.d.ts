export type SearchProductClick = {
    type: "search-product-click";
    searchUnitId: string;
    name: string;
};
export type SearchSuggestionClick = {
    type: "search-suggestion-click";
    searchUnitId: string;
    suggestion: string;
};
export type SearchRequestSent = {
    type: "search-request-sent";
    searchUnitId: string;
};
export type SearchResponseReceived = {
    type: "search-response-received";
    searchUnitId: string;
};
export type SearchResultsView = {
    type: "search-results-view";
    searchUnitId: string;
};
//# sourceMappingURL=analytics.d.ts.map