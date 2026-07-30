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
import { SlotProps } from '@dropins/tools/lib';
import { PURCHASE_ORDER_ACTION } from '../hooks';
export type PurchaseOrderStatusSlotContext = {
    loading: boolean;
    availableActions?: PURCHASE_ORDER_ACTION[];
    handleApprove: () => void;
    handleReject: () => void;
    handleCancel: () => void;
    handlePlaceOrder: () => void;
};
export interface PurchaseOrderStatusProps {
    className?: string;
    withHeader?: boolean;
    withWrapper?: boolean;
    slots?: {
        PurchaseOrderActions: SlotProps<PurchaseOrderStatusSlotContext>;
    };
}
