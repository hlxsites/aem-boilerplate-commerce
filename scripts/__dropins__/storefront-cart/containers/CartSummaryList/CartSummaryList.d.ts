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
import { Container, SlotProps } from '../../../node_modules/@dropins/tools/src/lib';
import { CartModel } from '../../data/models/cart-model';
import { ImageProps } from '../../../node_modules/@dropins/tools/src/components';
export interface CartSummaryListProps extends HTMLAttributes<HTMLDivElement> {
    hideHeading?: boolean;
    hideFooter?: boolean;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    itemTitleHeadingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    routeProduct?: (item: CartModel['items'][0]) => string;
    routeEmptyCartCTA?: () => string;
    routeCart?: () => string;
    onItemUpdate?: ({ item }: {
        item: CartModel['items'][0];
    }) => void;
    onItemRemove?: ({ item }: {
        item: CartModel['items'][0];
    }) => void;
    maxItems?: number;
    showMaxItems?: boolean;
    attributesToHide?: SwitchableAttributes[];
    slots?: {
        Heading?: SlotProps;
        EmptyCart?: SlotProps;
        Footer?: SlotProps;
        RowTotalFooter?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        Thumbnail?: SlotProps<{
            item: CartModel['items'][number];
            defaultImageProps: ImageProps;
        }>;
        ProductAttributes?: SlotProps;
        CartSummaryFooter?: SlotProps;
        CartItem?: SlotProps;
        UndoBanner?: SlotProps<{
            item: CartModel['items'][0];
            loading: boolean;
            error?: string;
            onUndo: () => void;
            onDismiss: () => void;
        }>;
        ConfirmDeleteBanner?: SlotProps<{
            item: CartModel['items'][0];
            loading: boolean;
            onConfirm: () => void;
            onCancel: () => void;
        }>;
        ItemTitle?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        ItemPrice?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        ItemQuantity?: SlotProps<{
            item: CartModel['items'][number];
            enableUpdateItemQuantity: boolean | {
                removeOnZero?: boolean;
            };
            handleItemQuantityUpdate: (item: CartModel['items'][number], quantity: number) => void;
            itemsLoading: Set<string>;
            handleItemsError: (uid: string, message?: string) => void;
            handleItemsLoading: (uid: string, state: boolean) => void;
            onItemUpdate?: ({ item }: {
                item: CartModel['items'][number];
            }) => void;
        }>;
        ItemTotal?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        ItemSku?: SlotProps<{
            item: CartModel['items'][number];
        }>;
        ItemRemoveAction?: SlotProps<{
            item: CartModel['items'][number];
            enableRemoveItem: boolean;
            handleItemQuantityUpdate: (item: CartModel['items'][number], quantity: number) => void;
            handleItemsError: (uid: string, message?: string) => void;
            handleItemsLoading: (uid: string, state: boolean) => void;
            onItemUpdate?: ({ item }: {
                item: CartModel['items'][number];
            }) => void;
            itemsLoading: Set<string>;
        }>;
    };
    enableRemoveItem?: boolean;
    enableUpdateItemQuantity?: boolean | {
        removeOnZero?: boolean;
    };
    onItemsErrorsChange?: (errors: Map<string, string>) => void;
    accordion?: boolean;
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
    showDiscount?: boolean;
    showSavings?: boolean;
    quantityType?: 'stepper' | 'dropdown';
    dropdownOptions?: {
        value: string;
        text: string;
    }[];
    undo?: boolean;
    confirmBeforeDelete?: boolean;
    includeOutOfStockItems?: boolean;
    /**
     * TEST ONLY: Allows test to inject recentlyRemovedItems for coverage
     */
    __testRecentlyRemovedItems?: Array<{
        item: CartModel['items'][0];
        index: number;
        loading: boolean;
        error?: string;
        beingRemoved?: boolean;
    }>;
}
export type SwitchableAttributes = 'name' | 'image' | 'configurations' | 'warning' | 'alert' | 'sku' | 'price' | 'quantity' | 'total' | 'totalDiscount' | 'totalExcludingTax';
export interface CartSummaryListRef {
    handleUndo: (uid: string) => Promise<void>;
}
export declare const CartSummaryList: Container<CartSummaryListProps, CartModel | null>;
