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
import { PaymentMethodConfig } from '../../containers';
import { PaymentMethod } from '../../data/models/payment-method';
import { UIComponentType } from '../../types';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
interface ExtendedPaymentMethod extends PaymentMethodConfig, PaymentMethod {
}
export interface PaymentMethodsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    error?: string | null;
    busy?: boolean;
    onDismissError?: () => void;
    onSelectionChange?: (value: PaymentMethod) => void;
    options?: ExtendedPaymentMethod[];
    paymentMethodContent?: VNode;
    selection: PaymentMethod | null;
    title?: VNode;
    UIComponentType?: UIComponentType;
}
export declare const PaymentMethods: FunctionComponent<PaymentMethodsProps & import("../ConditionalWrapper/ConditionalWrapper").ConditionalProps>;
export {};
