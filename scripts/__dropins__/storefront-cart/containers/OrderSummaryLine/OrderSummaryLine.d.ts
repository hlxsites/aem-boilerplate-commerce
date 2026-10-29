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
import { HTMLAttributes } from 'preact/compat';
import { Container } from '../../../node_modules/@dropins/tools/src/lib';
import { VNode } from 'preact';
export interface OrderSummaryLineProps extends Omit<HTMLAttributes<HTMLDivElement>, 'label'> {
    label: VNode | string;
    price: VNode<HTMLAttributes<HTMLSpanElement>>;
    classSuffixes?: Array<string>;
    labelClassSuffix?: string;
    testId?: string;
    children?: any;
}
export declare const OrderSummaryLine: Container<OrderSummaryLineProps>;
