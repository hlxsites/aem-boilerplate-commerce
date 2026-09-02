/********************************************************************
 * ADOBE CONFIDENTIAL
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
import { SlotProps } from '../../node_modules/@dropins/tools/src/lib';
import { OrderDataModel, OrderItemModel } from '../data/models';
import { ImageProps } from '../../node_modules/@dropins/tools/src/components';
type options = Record<string, string | number | boolean>;
export type TaxTypes = {
    taxIncluded: boolean;
    taxExcluded: boolean;
};
export interface OrderProductListProps {
    slots?: {
        Footer: SlotProps;
        CartSummaryItemImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
    };
    orderData?: OrderDataModel;
    className?: string;
    withHeader?: boolean;
    showConfigurableOptions?: (options: options | {}) => options;
    routeProductDetails?: (product: any) => string;
}
export interface OrderProductListContentProps extends Omit<OrderProductListProps, 'className'> {
    placeholderImage: string;
    order?: OrderDataModel;
    taxConfig: TaxTypes;
    loading: boolean;
}
export interface CartSummaryItemProps {
    slots?: {
        Footer: SlotProps;
        CartSummaryItemImage?: SlotProps<{
            data: OrderItemModel;
            defaultImageProps: ImageProps;
        }>;
    };
    placeholderImage?: string;
    disabledIncrementer?: boolean;
    loading: boolean;
    itemType: string;
    translations: Record<string, string>;
    product: OrderItemModel;
    taxConfig: TaxTypes;
    onQuantity?: (value: number) => void;
    showConfigurableOptions?: (options: options | {}) => options;
    routeProductDetails?: (product: any) => string;
}
export interface UseOrderProductListProps extends Omit<OrderProductListProps, 'className' | 'withHeader' | 'showConfigurableOptions' | 'slots'> {
}
export {};
