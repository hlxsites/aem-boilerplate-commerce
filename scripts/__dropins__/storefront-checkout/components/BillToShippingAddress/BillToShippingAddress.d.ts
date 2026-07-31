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
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface BillToShippingAddressProps extends Omit<HTMLAttributes<HTMLInputElement>, 'loading' | 'disabled' | 'onChange'> {
    disabled?: boolean;
    error?: string | null;
    onChange?: (checked: boolean) => void;
    onDismissError?: () => void;
}
export declare const BillToShippingAddress: FunctionComponent<BillToShippingAddressProps & import("../ConditionalWrapper/ConditionalWrapper").ConditionalProps>;
