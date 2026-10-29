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
import { OrderItemProps, OrderProps, QueryType, ResponseData } from '../../types';
import { OrderDataModel, OrderItemModel, TransformedData } from '../models';
export declare const transformConfigurableOptions: (item: OrderItemProps) => Record<string, string> | undefined;
export declare const transformBundleOptions: (data: any) => {
    [key: string]: any;
} | null;
export declare const transformLinks: (links: {
    title: string;
}[]) => {
    count: number;
    result: string;
} | null;
export declare const transformOrderItems: (items: OrderItemProps[]) => OrderItemModel[];
export declare const transformAppliedGiftCards: (appliedGiftCards?: any[]) => {
    code: any;
    appliedBalance: {
        value: any;
        currency: any;
    };
}[];
export declare const transformOrderData: (orderData: OrderProps, returnRef?: string) => OrderDataModel;
export declare const transformOrderDetails: <T extends QueryType>(queryType: QueryType, response: ResponseData<T>, returnRef?: string) => TransformedData<T>;
