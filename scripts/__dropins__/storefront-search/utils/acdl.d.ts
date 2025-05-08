/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/contexts.ts#L24
 */
export declare const contexts: {
    readonly SEARCH_INPUT_CONTEXT: "searchInputContext";
    readonly SEARCH_RESULTS_CONTEXT: "searchResultsContext";
};
/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/events.ts
 */
export declare const events: {
    readonly SEARCH_PRODUCT_CLICK: "search-product-click";
    readonly SEARCH_SUGGESTION_CLICK: "search-suggestion-click";
    readonly SEARCH_REQUEST_SENT: "search-request-sent";
    readonly SEARCH_RESPONSE_RECEIVED: "search-response-received";
    readonly SEARCH_RESULTS_VIEW: "search-results-view";
};
export declare const getAdobeDataLayer: () => import('../types/acdl').AdobeClientDataLayer;
/**
 * Sets a context in the Adobe Client Data Layer (ACDL)
 * Logic based on: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/Base.ts#L6
 */
export declare function setContext<T extends Record<string, unknown>>(name: string, data: T): void;
/**
 * Pushes an event to the Adobe Client Data Layer (ACDL)
 * Logic based on: https://github.com/adobe/commerce-events/blob/1973d0ce28471ef190fa06dad6359ffa0ab51db6/packages/storefront-events-sdk/src/Base.ts#L34
 */
export declare function pushEvent(event: string, context?: Record<string, unknown>): void;
//# sourceMappingURL=acdl.d.ts.map