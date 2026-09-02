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
import { ShippingMethod } from '../../data/models';
import { UIComponentType } from '../../types';
import { SlotProps } from '../../../node_modules/@dropins/tools/src/lib';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { ShippingMethodItemContext } from '../../containers/ShippingMethods';
/** Slot function type for ShippingMethodItem - uses Elsie Slot context for full replacement */
export type ShippingMethodItemSlot = SlotProps<ShippingMethodItemContext>;
export interface ShippingMethodsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    UIComponentType?: UIComponentType;
    busy?: boolean;
    error?: string | null;
    onDismissError?: () => void;
    onSelectionChange?: (method: ShippingMethod) => void;
    options: ShippingMethod[];
    selection: ShippingMethod | null;
    shippingMethodItemSlot?: ShippingMethodItemSlot;
    title?: VNode;
}
export declare const ShippingMethods: FunctionComponent<ShippingMethodsProps & import("../ConditionalWrapper/ConditionalWrapper").ConditionalProps>;
