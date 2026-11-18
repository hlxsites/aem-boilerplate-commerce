/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2026 Adobe
 * All Rights Reserved.
 *******************************************************************/
import { jsPDF } from 'jspdf';
import { OrderDataModel, OrderInvoiceModel } from '../data/models/index.js';
import en_US from '@/order/i18n/en_US.json';
export type InvoicePdfLabels = typeof en_US.Order.InvoiceDetails.pdf;
export interface InvoicePdfBranding {
    logoDataUrl?: string;
    storeName?: string;
    addressLines?: string[];
}
export interface InvoicePdfInput {
    order: OrderDataModel;
    invoice: OrderInvoiceModel;
    branding?: InvoicePdfBranding;
    locale?: string;
    labels?: Partial<InvoicePdfLabels>;
}
export declare const createInvoicePdf: ({ order, invoice, branding, locale, labels, }: InvoicePdfInput) => jsPDF;
export declare const downloadInvoicePdf: (input: InvoicePdfInput) => void;
