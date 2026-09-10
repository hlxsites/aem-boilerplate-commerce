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
import { SlotProps } from '@dropins/tools/lib';
import { HTMLAttributes } from 'preact/compat';
import { OrderDetails, OrderItem, ShipmentsTracingModel } from '../data/models';
import { ImageProps } from '@dropins/tools/components';
export interface OrdersListActionContext {
    orderHistoryListItem: OrderDetails;
}
export interface OrdersListCardContext {
    orderHistoryListItem: OrderDetails;
}
export interface OrdersListOrderTimeContext {
    deliveryDateText?: string;
    orderDate?: string;
    orderTime?: string;
}
export interface OrdersListProps extends HTMLAttributes<HTMLDivElement> {
    minifiedView?: boolean;
    withHeader?: boolean;
    withThumbnails?: boolean;
    slots?: {
        OrdersListAction?: SlotProps<OrdersListActionContext>;
        OrdersListCard?: SlotProps<OrdersListCardContext>;
        OrderItemImage?: SlotProps<{
            data: OrderItem;
            defaultImageProps: ImageProps;
        }>;
    };
    routeOrdersList?: () => string;
    routeOrderDetails?: () => string;
    routeReturnDetails?: (params: {
        orderNumber: string;
        orderToken: string;
        returnNumber: string;
    }) => string;
    withFilter?: boolean;
    ordersInMinifiedView?: 1 | 2 | 3;
    pageSize: number;
    routeTracking?: (shipping: ShipmentsTracingModel) => string;
    routeOrderProduct?: (product: OrderItem) => string;
}
export interface OrdersListWrapperProps extends OrdersListProps {
}
export interface OrdersListCardProps extends HTMLAttributes<HTMLDivElement> {
    placeholderImage: string;
    minifiedView: boolean;
    item: OrderDetails;
    withThumbnails: boolean;
    slots?: {
        OrdersListCard?: SlotProps<OrdersListCardContext>;
        OrdersListOrderTime?: SlotProps<OrdersListOrderTimeContext>;
        OrderItemImage?: SlotProps<{
            data: OrderItem;
            defaultImageProps: ImageProps;
        }>;
    };
    routeTracking?: (shipping: ShipmentsTracingModel) => string;
    routeOrderProduct?: (product: OrderItem) => string;
    routeReturnDetails?: (params: {
        orderNumber: string;
        orderToken: string;
        returnNumber: string;
    }) => string;
}
export interface OrdersListActionProps {
    minifiedView: boolean;
    orderNumber?: string;
    orderToken?: string;
    routeOrdersList?: () => string;
    routeOrderDetails?: (orderNumber?: string, orderToken?: string) => string;
}
export interface UseOrdersListProps {
    selectedPage: number;
    minifiedView?: boolean;
    pageSize: number;
    ordersInMinifiedView: number;
    selectedDate: string;
    handleSetFirstOrderDate: (date: string) => void;
}
