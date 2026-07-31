/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface CartItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'loading'> {
    ariaLabel?: string;
    image?: VNode;
    title?: VNode;
    price?: VNode;
    rowTotalFooter?: VNode;
    taxIncluded?: boolean;
    taxExcluded?: boolean;
    total?: VNode;
    totalExcludingTax?: VNode;
    sku?: VNode;
    quantity?: number;
    quantityContent?: VNode;
    description?: VNode;
    attributes?: VNode;
    footer?: VNode;
    configurations?: {
        [key: string]: any;
    };
    warning?: VNode;
    alert?: VNode;
    discount?: VNode;
    savings?: VNode;
    actions?: VNode;
    removeContent?: VNode;
    loading?: boolean;
    updating?: boolean;
    onRemove?: () => void;
    onQuantity?: (value: number) => void;
    quantityType?: 'stepper' | 'dropdown';
    dropdownOptions?: {
        value: string;
        text: string;
    }[];
}
export declare const CartItem: FunctionComponent<CartItemProps>;
