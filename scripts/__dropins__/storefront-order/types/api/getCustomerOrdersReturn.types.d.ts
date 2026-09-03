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
import { ReturnsItemsProps } from './getOrderDetails.types';
export interface OrdersReturnResponseProps {
    page_info?: {
        page_size: number;
        total_pages: number;
        current_page: number;
    };
    items?: ReturnsItemsProps[];
}
export interface GetCustomerOrdersReturnResponse {
    data: {
        customer: {
            returns: OrdersReturnResponseProps;
        };
    };
    errors?: {
        message: string;
    }[];
}
