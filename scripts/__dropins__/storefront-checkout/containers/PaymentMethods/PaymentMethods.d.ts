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
import { AdditionalData, PaymentMethod } from '../../data/models/payment-method';
import { TitleProps, UIComponentType } from '../../types';
import { Container, SlotProps } from '../../../node_modules/@dropins/tools/src/lib';
import { HTMLAttributes } from 'preact/compat';
interface RenderContext {
    additionalData?: AdditionalData;
    cartId: string;
    replaceHTML: (domElement: HTMLElement) => void;
    setAdditionalData: (data: AdditionalData) => void;
}
export interface PaymentMethodConfig {
    autoSync?: boolean;
    displayLabel?: boolean;
    enabled?: boolean;
    icon?: string;
    render?: SlotProps<RenderContext>;
}
export interface PaymentMethodHandlers {
    [code: string]: PaymentMethodConfig;
}
interface CartSyncError {
    method: PaymentMethod;
    error: Error;
}
export interface PaymentMethodsProps extends HTMLAttributes<HTMLDivElement>, TitleProps {
    slots?: {
        Methods?: PaymentMethodHandlers;
    } & TitleProps['slots'];
    UIComponentType?: UIComponentType;
    active?: boolean;
    autoSync?: boolean;
    onCartSyncError?: (error: CartSyncError) => void;
    onSelectionChange?: (method: PaymentMethod) => void;
}
export declare const PaymentMethods: Container<PaymentMethodsProps>;
export {};
