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
import { MoneyProps, DiscountProps, OrderCommentItem } from '../../types/index.js';
export interface OrderInvoiceItemModel {
    id: string;
    productSku: string;
    productName: string;
    quantityInvoiced: number;
    productSalePrice: MoneyProps;
    taxAmount: MoneyProps | null;
    rowTotal: MoneyProps | null;
    discounts?: DiscountProps[];
}
export interface OrderInvoiceTaxModel {
    amount: MoneyProps;
    rate: number;
    title: string;
}
export interface OrderInvoiceShippingHandlingModel {
    totalAmount: MoneyProps;
}
export interface OrderInvoiceTotalModel {
    subtotal: MoneyProps;
    grandTotal: MoneyProps;
    baseGrandTotal: MoneyProps;
    taxes: OrderInvoiceTaxModel[];
    shippingHandling?: OrderInvoiceShippingHandlingModel;
    discounts: DiscountProps[];
}
export interface OrderInvoiceModel {
    id: string;
    number: string;
    status: string;
    comments: OrderCommentItem[];
    items: OrderInvoiceItemModel[];
    total: OrderInvoiceTotalModel;
}
export interface OrderInvoicesModel {
    orderNumber: string;
    invoices: OrderInvoiceModel[];
}
