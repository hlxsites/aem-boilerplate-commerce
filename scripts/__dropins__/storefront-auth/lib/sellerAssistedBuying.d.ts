/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
export interface SellerAssistedBuyingConfig {
    triggerUrl?: string;
    enabled?: boolean;
}
/**
 * Checks if the current session is an admin-driven session
 */
export declare const isAdminSession: () => boolean;
/**
 * Main flow for Seller Assisted Buying session initialization
 * Returns true if session was successfully initialized, false otherwise
 */
export declare const initializeSellerAssistedBuyingSession: (config?: SellerAssistedBuyingConfig) => Promise<boolean>;
//# sourceMappingURL=sellerAssistedBuying.d.ts.map