/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 *  Copyright 2026 Adobe
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
import { MoneyProps, DiscountProps } from './getOrderDetails.types';
import { OrderCommentItem } from '../orderComments.types';
export interface OrderInvoiceItem {
    __typename?: string;
    id: string;
    product_name: string;
    product_sku: string;
    quantity_invoiced: number;
    product_sale_price: MoneyProps;
    tax_amount: MoneyProps | null;
    row_total: MoneyProps | null;
    discounts?: (DiscountProps | null)[] | null;
}
export interface OrderInvoiceTaxItem {
    amount: MoneyProps;
    rate: number;
    title: string;
}
export interface OrderInvoiceShippingHandling {
    total_amount: MoneyProps;
}
export interface OrderInvoiceTotal {
    __typename?: string;
    subtotal: MoneyProps;
    grand_total: MoneyProps;
    base_grand_total: MoneyProps;
    taxes?: OrderInvoiceTaxItem[];
    shipping_handling?: OrderInvoiceShippingHandling;
    discounts?: DiscountProps[];
}
export interface OrderInvoice {
    __typename?: string;
    id: string;
    number: string;
    status: string;
    comments?: OrderCommentItem[] | null;
    items?: OrderInvoiceItem[] | null;
    total?: OrderInvoiceTotal | null;
}
export interface OrderInvoicesItem {
    number: string;
    invoices: OrderInvoice[];
}
export interface GetOrderInvoicesResponse {
    data: {
        customer: {
            orders: {
                items: OrderInvoicesItem[];
            };
        };
    };
    errors?: {
        message: string;
    }[];
}
