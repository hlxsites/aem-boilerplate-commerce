/**
 * using the acdl enhancer and collector together can create an infinate loop, we can provide a source on the event
 * so that we can filter out any events that are coming from each event generator
 */
export declare const enum AceEventSource {
    ACDL = "acdl",
    Collector = "collector"
}
export declare const enum AcdlEventType {
    /** Triggered when data is pushed to the data layer. */
    Event = "adobeDataLayer:event",
    /** Triggered when an event is pushed to the data layer. */
    Change = "adobeDataLayer:change"
}
export declare const enum FilterScope {
    /**
     * The listener is triggered for both past and future events
     * @default
     */
    All = "all",
    /** The listener is triggered for past events only */
    Past = "past",
    /** The listener is triggered for future events only */
    Future = "future"
}
type AddEventListenerOptions = {
    path?: string;
    scope?: FilterScope;
};
export interface AdobeClientDataLayer {
    push(...items: (object | Function)[]): number;
    getState<T = Record<string, unknown>>(reference: string): T;
    addEventListener(type: string, callback: Function, options?: AddEventListenerOptions): void;
    removeEventListener(type: string, listener: Function): void;
}
export {};
//# sourceMappingURL=acdl.d.ts.map