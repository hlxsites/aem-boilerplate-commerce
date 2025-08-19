import { PaymentServicesSDK } from '@adobe-commerce/payment-services-sdk';

/**
 * Payment Services drop-in state.
 */
export type State = {
    status: 'initializing' | 'error' | 'ready';
    /**
     * Invariants
     *  - (status === "ready") === (sdk !== null)
     *  - (sdk !== null) -> sdk.Payment.init() called and awaited
     */
    paymentsSDK: PaymentServicesSDK | null;
};
/**
 * Reactive atomic drop-in state.
 */
export declare const state: import('@preact/signals-core').Signal<State>;
//# sourceMappingURL=state.d.ts.map