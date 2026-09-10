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
import { ShippingMethodItemSlot } from '../../components/ShippingMethods';
import { ShippingMethod } from '../../data/models';
import { Filter, TitleProps, UIComponentType } from '../../types';
import { Container } from '../../../node_modules/@dropins/tools/src/lib';
import { HTMLAttributes } from 'preact/compat';
/**
 * Context provided to the ShippingMethodItem slot.
 * Used for complete UI replacement via replaceWith.
 */
export interface ShippingMethodItemContext {
    method: ShippingMethod;
    isSelected: boolean;
    onSelect: () => void;
}
interface CartSyncError {
    method: ShippingMethod;
    error: Error;
}
export type ShippingOptionsFilter = Filter<ShippingMethod>;
export interface ShippingMethodsProps extends HTMLAttributes<HTMLDivElement>, TitleProps {
    UIComponentType?: UIComponentType;
    active?: boolean;
    autoSync?: boolean;
    onCartSyncError?: (error: CartSyncError) => void;
    onSelectionChange?: (method: ShippingMethod) => void;
    slots?: {
        ShippingMethodItem?: ShippingMethodItemSlot;
    } & TitleProps['slots'];
}
export declare function emitShippingEstimateEvent(selection: ShippingMethod): void;
export declare const ShippingMethods: Container<ShippingMethodsProps>;
export {};
