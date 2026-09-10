/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { ImageProps } from '@dropins/tools/components';
import { SlotProps } from '@dropins/tools/lib';
import { CartItemModel as NegotiableQuoteItemModel, StoreConfigModel } from '../data/models';
import { SwitchableAttributes } from '../containers/QuoteSummaryList/QuoteSummaryList';
export interface ItemFormatterOptions {
    attributesToHide: SwitchableAttributes[];
    routeProduct?: (item: NegotiableQuoteItemModel) => string;
    slots?: {
        Thumbnail?: SlotProps<{
            item: NegotiableQuoteItemModel;
            defaultImageProps: ImageProps;
        }>;
        ProductAttributes?: SlotProps<{
            item: NegotiableQuoteItemModel;
        }>;
    };
    dictionary: Record<string, string>;
    quoteDisplaySettings?: StoreConfigModel['quoteDisplaySettings'];
}
/**
 * Get image component for an item
 */
export declare const getImage: (item: NegotiableQuoteItemModel, index: number, options: ItemFormatterOptions) => import("preact").JSX.Element | undefined;
/**
 * Get title component for an item
 */
export declare const getTitle: (item: NegotiableQuoteItemModel, options: ItemFormatterOptions) => import("preact").JSX.Element | undefined;
/**
 * Get SKU component for an item
 */
export declare const getSku: (item: NegotiableQuoteItemModel) => import("preact").JSX.Element;
/**
 * Get product attributes slot for an item
 */
export declare const getProductAttributes: (item: NegotiableQuoteItemModel, options: ItemFormatterOptions) => import("preact").JSX.Element;
/**
 * Get configurations for an item (bundle, configurable, customizable options)
 */
export declare const getConfigurations: (item: NegotiableQuoteItemModel, options: ItemFormatterOptions) => any;
/**
 * Get total excluding tax component for an item
 */
export declare const getTotalExcludingTax: (item: NegotiableQuoteItemModel, options: ItemFormatterOptions) => import("preact").JSX.Element | undefined;
