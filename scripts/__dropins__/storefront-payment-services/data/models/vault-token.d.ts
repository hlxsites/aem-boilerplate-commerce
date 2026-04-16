/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
/** Single item from `customerPaymentTokens.items` (GraphQL). */
export type CustomerPaymentTokenItem = {
    details?: unknown;
    public_hash?: string;
    payment_method_code?: string;
    type?: string;
};
/** Normalized vault token used in checkout / StoredCards wiring. */
export type NormalizedVaultToken = {
    publicHash?: string;
    methodCode: string;
    type: string;
    brand: string;
    masked: string;
    expiry: string;
    holder: string;
};
/** Props shape aligned with `StoredCards` / `StoredCard`. */
export type VaultStoredCardProps = {
    publicHash?: string;
    brand: string;
    maskedNumber: string;
    expiry: string;
    holderName: string;
};
//# sourceMappingURL=vault-token.d.ts.map