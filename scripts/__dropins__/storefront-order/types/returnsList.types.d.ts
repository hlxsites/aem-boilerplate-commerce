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
import { SlotProps } from '@dropins/tools/src/lib';
import { ImageProps } from '../../node_modules/@dropins/tools/src/components';
import { OrderDataModel, OrderItemModel, OrdersReturnItemsPropsModel, OrdersReturnPropsModel, PageInfoProps } from '../data/models';
export interface IconConfig {
    size: '12' | '16' | '24' | '32' | '64' | '80' | undefined;
    stroke: '4' | '1' | '2' | '3' | undefined;
}
type routeTrackingProps = {
    carrier: string;
    title: string;
    number: string;
};
export interface ReturnsListProps {
    slots?: {
        ReturnItemsDetails?: SlotProps<{
            items: OrdersReturnItemsPropsModel[];
        }>;
        DetailsActionParams?: SlotProps<{
            returnOrderItem: OrdersReturnPropsModel;
        }>;
        ReturnListImage?: SlotProps<{
            data: OrdersReturnItemsPropsModel;
            defaultImageProps: ImageProps;
        }>;
    };
    returnPageSize?: number;
    withReturnsListButton?: boolean;
    returnsInMinifiedView?: number;
    className?: string;
    minifiedView?: boolean;
    withHeader?: boolean;
    routeReturnDetails?: ({ returnNumber, token, orderNumber, }: {
        returnNumber: string;
        token: string;
        orderNumber: string;
    }) => string;
    routeOrderDetails?: ({ token, orderNumber, }: {
        token: string;
        orderNumber: string;
    }) => string;
    routeTracking?: (track: routeTrackingProps) => string;
    routeReturnsList?: () => string;
    routeProductDetails?: (orderItem?: OrderItemModel) => string;
    withThumbnails?: boolean;
}
export interface ReturnsListContentProps extends Omit<ReturnsListProps, 'className' | 'returnPageSize'> {
    placeholderImage?: string;
    minifiedViewKey: 'minifiedView' | 'fullSizeView';
    orderReturns?: OrdersReturnPropsModel[] | [];
    translations: Record<string, string>;
    isMobile: boolean;
    pageInfo: PageInfoProps;
    selectedPage?: number;
    handleSetSelectPage?: (value: number) => void;
    withOrderNumber?: boolean;
    withReturnNumber?: boolean;
    loading: boolean;
}
export interface UseReturnsListProps {
    returnPageSize?: number;
}
export interface OrderReturnsProps {
    slots?: {
        ReturnItemsDetails?: SlotProps<{
            items: OrdersReturnItemsPropsModel[];
        }>;
        DetailsActionParams?: SlotProps<{
            returnOrderItem: OrdersReturnPropsModel;
        }>;
        ReturnListImage?: SlotProps<{
            data: OrdersReturnItemsPropsModel;
            defaultImageProps: ImageProps;
        }>;
    };
    withThumbnails?: boolean;
    withHeader?: boolean;
    className?: string;
    orderData?: OrderDataModel;
    routeReturnDetails?: ({ token, orderNumber, }: {
        token: string;
        orderNumber: string;
    }) => string;
    routeProductDetails?: (product: any) => string;
    routeTracking?: (track: routeTrackingProps) => string;
}
export interface UseOrderReturnsProps {
    orderData?: OrderDataModel;
}
export {};
