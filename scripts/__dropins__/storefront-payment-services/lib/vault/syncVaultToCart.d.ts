import { CreatePaymentOrderForVaultResult } from './checkout-payload';

export type VaultCheckoutSyncFetchGraphQl = (query: string, options?: {
    variables?: Record<string, unknown>;
    method?: string;
}) => Promise<{
    data?: {
        createPaymentOrder?: CreatePaymentOrderForVaultResult;
    };
    errors?: unknown[];
}>;
export type VaultCheckoutSyncDeps = {
    fetchGraphQl: VaultCheckoutSyncFetchGraphQl;
    setPaymentMethod: (payload: Record<string, unknown>) => Promise<unknown>;
};
/**
 * Payment Services vault checkout: `createPaymentOrder` then `setPaymentMethod` with
 * public_hash and order ids. Host supplies checkout (or mesh) `fetchGraphQl` and `setPaymentMethod`.
 */
export declare function syncVaultToCart(token: {
    publicHash?: string;
}, cartId: string | undefined, deps: VaultCheckoutSyncDeps): Promise<Record<string, unknown> | null>;
//# sourceMappingURL=syncVaultToCart.d.ts.map