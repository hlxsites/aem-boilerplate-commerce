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
import { HTMLAttributes } from 'preact/compat';
import { Container } from '../../../node_modules/@dropins/tools/src/lib';
import type { CartModel } from '../../data/models';
export interface FreeGiftSelectionProps extends HTMLAttributes<HTMLDivElement> {
    /** Shows the trigger button when pending free gifts are available. */
    showTrigger?: boolean;
    /**
     * Optional cart model override. Used both by callers that already hold the cart
     * (CartSummaryTable/List/Grid pass their live model here) and by isolated
     * Storybook/test usage.
     */
    cartData?: CartModel | null;
}
export declare const FreeGiftSelection: Container<FreeGiftSelectionProps>;
