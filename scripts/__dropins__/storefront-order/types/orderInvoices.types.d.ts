/********************************************************************
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { OrderDataModel, OrderInvoiceModel } from '../data/models/index.js';
export interface OrderInvoicesComponentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading'> {
    invoices?: OrderInvoiceModel[];
    loading?: boolean;
    error?: Error | null;
    orderNumber?: string;
    routeInvoiceDetails?: (invoice: OrderInvoiceModel, orderNumber: string) => string;
}
export interface OrderInvoicesProps {
    className?: string;
    orderData?: OrderDataModel;
    routeInvoiceDetails?: (invoice: OrderInvoiceModel, orderNumber: string) => string;
}
export interface UseOrderInvoicesProps {
    orderData?: OrderDataModel;
}
