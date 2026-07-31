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
import { JSXInternal } from 'preact/src/jsx';
export interface OrderSummaryLineItem {
    key: string;
    title?: string;
    className?: string;
    sortOrder: number;
    content: string | JSXInternal.Element | VNode<HTMLAttributes<HTMLDivElement>> | OrderSummaryLineItem[] | undefined;
}
export interface OrderSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    variant?: 'primary' | 'secondary';
    heading?: VNode<HTMLAttributes<HTMLDivElement>>;
    loading?: boolean;
    subTotal?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceExcludingTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
        taxIncluded?: boolean;
        taxExcluded?: boolean;
        zeroTaxSubtotal?: boolean;
    };
    shipping?: VNode<HTMLAttributes<HTMLDivElement>>;
    discounts?: {
        label: string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        caption?: VNode<HTMLAttributes<HTMLDivElement>>;
        coupon?: VNode<HTMLAttributes<HTMLSpanElement>>;
    }[];
    taxTotal?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        estimated?: boolean;
    };
    taxesApplied?: {
        label: string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
    }[];
    total?: {
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        estimated?: boolean;
        priceWithoutTax?: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    printedCard?: {
        renderContent: boolean;
        taxIncluded: boolean;
        taxInclAndExcl: boolean;
        priceExclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceInclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    itemsGiftWrapping?: {
        renderContent: boolean;
        taxIncluded: boolean;
        taxInclAndExcl: boolean;
        priceExclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceInclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    orderGiftWrapping?: {
        renderContent: boolean;
        taxIncluded: boolean;
        taxInclAndExcl: boolean;
        priceExclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
        priceInclTax: VNode<HTMLAttributes<HTMLSpanElement>>;
    };
    primaryAction?: VNode<HTMLAttributes<HTMLButtonElement>>;
    coupons?: VNode<HTMLAttributes<HTMLDivElement>>;
    giftCards?: VNode<HTMLAttributes<HTMLDivElement>>;
    totalSaved?: VNode<HTMLAttributes<HTMLSpanElement>>;
    appliedGiftCards?: {
        label: VNode<HTMLAttributes<HTMLSpanElement>> | string;
        price: VNode<HTMLAttributes<HTMLSpanElement>>;
        content?: VNode[];
    };
    updateLineItems?: (lineItems: Array<OrderSummaryLineItem>) => Array<OrderSummaryLineItem>;
}
export declare const OrderSummary: FunctionComponent<OrderSummaryProps>;
