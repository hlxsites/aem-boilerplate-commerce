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
import { OrderItemModel } from './order-details';
export interface OrdersReturnItemsPropsModel extends OrderItemModel {
    quantity: number;
    requestQuantity: number;
    status: string;
    uid: string;
}
export interface OrdersReturnTrackingProps {
    status: {
        text: string;
        type: string;
    };
    carrier: {
        uid: string;
        label: string;
    };
    trackingNumber: string;
}
export interface OrdersReturnPropsModel {
    token: string;
    orderNumber: string;
    returnStatus: string;
    returnNumber: string;
    createdReturnAt: string;
    tracking: OrdersReturnTrackingProps[];
    items: OrdersReturnItemsPropsModel[];
}
export interface PageInfoProps {
    pageSize: number;
    totalPages: number;
    currentPage: number;
}
export interface CustomerOrdersReturnModel {
    ordersReturn: OrdersReturnPropsModel[];
    pageInfo?: PageInfoProps;
}
