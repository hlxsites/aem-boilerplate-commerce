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
import { Container, SlotProps } from '@dropins/tools/lib';
import { ImageProps } from '@dropins/tools/components';
import { Item, RecommendationUnitModel } from '../../data/models/index.js';
import type { CurrentProduct } from '../../api/getRecommendationsByUnitIds/getRecommendationsByUnitIds.js';
export interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    label?: string;
    recId?: string;
    initialData?: {
        recommendations?: {
            results: RecommendationUnitModel[];
            totalProducts: number;
        };
    };
    hideHeading?: boolean;
    routeProduct?: (item: Item) => string;
    /** @deprecated Pass `currentProduct` with `sku` instead. Kept for backward compatibility. */
    currentSku?: string;
    /** Current product SKU and optional price for recommendation filtering. */
    currentProduct?: CurrentProduct;
    cartSkus?: string[];
    userPurchaseHistory?: any[];
    userViewHistory?: any[];
    pagePlacement?: string | '';
    slots?: {
        Heading?: SlotProps;
        Footer?: SlotProps;
        Title?: SlotProps<{
            item: Item;
            productUrl: string;
        }>;
        Sku?: SlotProps<{
            item: Item;
        }>;
        Price?: SlotProps<{
            item: Item;
        }>;
        Thumbnail?: SlotProps<{
            item: any;
            defaultImageProps: ImageProps;
        }>;
    };
}
export declare const ProductList: Container<ProductListProps>;
