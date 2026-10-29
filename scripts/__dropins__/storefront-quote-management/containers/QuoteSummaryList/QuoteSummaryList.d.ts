/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { ImageProps } from '@dropins/tools/components';
import { Container, SlotProps } from '@dropins/tools/lib';
import { CartItemModel as NegotiableQuoteItemModel } from '../../data/models';
export interface QuoteSummaryListProps extends HTMLAttributes<HTMLDivElement> {
    hideHeading?: boolean;
    hideFooter?: boolean;
    routeProduct?: (item: NegotiableQuoteItemModel) => string;
    showMaxItems?: boolean;
    attributesToHide?: SwitchableAttributes[];
    slots?: {
        Heading?: SlotProps<{
            count: number;
            quoteId: string;
        }>;
        Footer?: SlotProps<{
            item: NegotiableQuoteItemModel;
        }>;
        Thumbnail?: SlotProps<{
            item: NegotiableQuoteItemModel;
            defaultImageProps: ImageProps;
        }>;
        ProductAttributes?: SlotProps<{
            item: NegotiableQuoteItemModel;
        }>;
        QuoteSummaryFooter?: SlotProps<{
            displayMaxItems: boolean;
        }>;
        QuoteItem?: SlotProps;
        ItemTitle?: SlotProps<{
            item: NegotiableQuoteItemModel;
        }>;
        ItemPrice?: SlotProps<{
            item: NegotiableQuoteItemModel;
        }>;
        ItemTotal?: SlotProps<{
            item: NegotiableQuoteItemModel;
        }>;
        ItemSku?: SlotProps<{
            item: NegotiableQuoteItemModel;
        }>;
    };
    accordion?: boolean;
    variant?: 'primary' | 'secondary';
    showDiscount?: boolean;
    showSavings?: boolean;
}
export type SwitchableAttributes = 'name' | 'image' | 'configurations' | 'warning' | 'alert' | 'sku' | 'price' | 'quantity' | 'total' | 'totalDiscount' | 'totalExcludingTax';
export declare const QuoteSummaryList: Container<QuoteSummaryListProps>;
