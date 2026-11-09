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
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface EstimateShippingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    countryField?: VNode<HTMLAttributes<HTMLInputElement>>;
    destinationText?: string;
    estimateButton?: VNode<HTMLAttributes<HTMLButtonElement>>;
    estimated?: boolean;
    loading: boolean;
    onEstimate?: (formData: any) => void;
    price: VNode<HTMLAttributes<HTMLSpanElement>>;
    priceExcludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    priceIncludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    stateField?: VNode<HTMLAttributes<HTMLInputElement>>;
    taxExcluded?: boolean;
    taxIncluded?: boolean;
    zipField?: VNode<HTMLAttributes<HTMLInputElement>>;
}
export declare const EstimateShipping: FunctionComponent<EstimateShippingProps>;
