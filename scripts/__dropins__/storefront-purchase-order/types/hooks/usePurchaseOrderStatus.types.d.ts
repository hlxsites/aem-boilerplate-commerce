/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import { InLineAlertProps } from '@dropins/tools/components';
export type PURCHASE_ORDER_STATUS = 'PENDING' | 'APPROVAL_REQUIRED' | 'APPROVED' | 'ORDER_IN_PROGRESS' | 'ORDER_PLACED' | 'ORDER_FAILED' | 'REJECTED' | 'CANCELED' | 'APPROVED_PENDING_PAYMENT';
export type PURCHASE_ORDER_ACTION = 'REJECT' | 'CANCEL' | 'APPROVE' | 'PLACE_ORDER';
export interface UsePurchaseOrderStatusReturn {
    alertType: NonNullable<InLineAlertProps['type']>;
    poId: string | null;
    status: PURCHASE_ORDER_STATUS;
    availableActions: PURCHASE_ORDER_ACTION[] | [];
    loading: boolean;
    poDataLoading: boolean;
    isDismissed: boolean;
    alertMessage: string;
    handleOnDismiss: () => void;
    handleApprove: () => Promise<void>;
    handleReject: () => Promise<void>;
    handleCancel: () => Promise<void>;
    handlePlaceOrder: () => Promise<void>;
}
