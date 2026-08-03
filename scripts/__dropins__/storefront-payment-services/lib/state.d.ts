import { PaymentServicesSDK } from '@adobe-commerce/payment-services-sdk';
import { PaymentLocation } from '../data/models/location';

/**
 * Payment Services drop-in state.
 */
export type State = {
    status: 'initializing' | 'error' | 'ready';
    /**
     * Invariants
     *  - (status === "ready") === (paymentsSDK !== null)
     *  - (paymentsSDK !== null) -> sdk.Payment.init() called and awaited for all locations
     */
    paymentsSDK: {
        checkout: PaymentServicesSDK;
        productDetail: PaymentServicesSDK;
    } | null;
};
/**
 * Reactive atomic drop-in state.
 */
export declare const state: import('@preact/signals-core').Signal<State>;
/**
 * Helper function to get the Payments JS SDK for a given payment location.
 *
 * @returns SDK instance or null if the dropin status !== "ready"
 */
export declare function getSdk(location: PaymentLocation): null | PaymentServicesSDK;
//# sourceMappingURL=state.d.ts.map