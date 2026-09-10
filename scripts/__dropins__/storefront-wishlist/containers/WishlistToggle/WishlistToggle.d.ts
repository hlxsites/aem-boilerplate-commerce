/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import { Product } from '../../data/models';
import { VNode } from 'preact';
export interface WishlistToggleProps extends HTMLAttributes<HTMLDivElement> {
    product: Product;
    iconWishlisted?: VNode<HTMLAttributes<SVGSVGElement>>;
    iconToWishlist?: VNode<HTMLAttributes<SVGSVGElement>>;
    size?: 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
    labelToWishlist?: string;
    labelWishlisted?: string;
    onClick?: () => void;
    removeProdFromCart?: (product: {
        uid: string;
        quantity: number;
    }[]) => Promise<any>;
}
export declare const WishlistToggle: Container<WishlistToggleProps>;
