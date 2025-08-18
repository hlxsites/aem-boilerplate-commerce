import { PaymentServicesSDK } from '@adobe-commerce/payment-services-sdk';

/**
 * Payment Services SDK signal. Invariants:
 *  - (sdk !== null) -> sdk.Payment.init() called and awaited
 */
export declare const paymentsSDK: import('@preact/signals-core').ReadonlySignal<PaymentServicesSDK | null>;
/**
 * Payment Services drop-in status signal.
 */
export declare const status: import('@preact/signals-core').ReadonlySignal<"ready" | "initializing" | "error">;
//# sourceMappingURL=signals.d.ts.map