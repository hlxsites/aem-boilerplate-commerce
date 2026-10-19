import { PaymentServicesSDK } from '@adobe-commerce/payment-services-sdk';
import { PaymentLocation } from '../api';

export declare function getCheckoutCartId(): Promise<string>;
/**
 * Uses the checkout cart or creates a PDP shadow cart.
 * The callback receives the pending promise so cancellation can clean up before creation finishes.
 */
export declare function resolveGetCartId(location: PaymentLocation, sdk: PaymentServicesSDK, onPdpCartIdPromiseResolved?: (cartIdPromise: Promise<string>) => void): () => Promise<string>;
/**
 * Creates a shadow cart from `pdp/data` and `pdp/values`.
 */
export declare function getPdpCartId(sdk: PaymentServicesSDK): Promise<string>;
//# sourceMappingURL=pdpCart.d.ts.map