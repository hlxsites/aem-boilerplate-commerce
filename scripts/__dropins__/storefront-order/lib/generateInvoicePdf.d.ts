/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2026 Adobe
 * All Rights Reserved.
 *******************************************************************/
import { jsPDF } from 'jspdf';
import { OrderDataModel, OrderInvoiceModel } from '../data/models/index.js';
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
}
export declare const createInvoicePdf: ({ order, invoice, branding, locale, }: InvoicePdfInput) => jsPDF;
export declare const downloadInvoicePdf: (input: InvoicePdfInput) => void;
