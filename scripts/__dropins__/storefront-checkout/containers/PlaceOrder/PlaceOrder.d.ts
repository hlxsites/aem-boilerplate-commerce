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
import { Container, SlotProps } from '../../../node_modules/@dropins/tools/src/lib';
import { HTMLAttributes } from 'preact/compat';
export interface ContentSlotContext {
    code: string;
}
export interface HandlePlaceOrderContext {
    code: string;
    cartId?: string | null;
    quoteId?: string | null;
}
export interface PlaceOrderProps extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    active?: boolean;
    handleValidation?: () => boolean | Promise<boolean>;
    handlePlaceOrder: (ctx: HandlePlaceOrderContext) => Promise<void>;
    slots?: {
        Content?: SlotProps<ContentSlotContext>;
    };
}
export declare const PlaceOrder: Container<PlaceOrderProps>;
