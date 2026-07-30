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
import { OrderDataModel, OrdersReturnPropsModel } from '../data/models';
import { SlotProps } from '../../node_modules/@dropins/tools/src/lib';
import { UserInputErrorProps } from '.';
export declare enum StatusEnumProps {
    PENDING = "pending",
    SHIPPING = "shipping",
    COMPLETE = "complete",
    PROCESSING = "processing",
    HOLD = "on hold",
    CANCELED = "Canceled",
    SUSPECTED_FRAUD = "suspected fraud",
    PAYMENT_REVIEW = "payment review"
}
type DefaultSlotContext = {
    orderData?: OrderDataModel;
};
export interface OrderStatusProps {
    className?: string;
    orderData?: OrderDataModel;
    statusTitle?: string;
    status?: StatusEnumProps;
    slots?: {
        OrderActions: SlotProps<DefaultSlotContext>;
    };
    routeCreateReturn?: (orderReturn: OrdersReturnPropsModel) => string;
    routeOnSuccess?: () => string;
    onError?: (errorInformation: UserInputErrorProps[] | string) => void;
}
export interface OrderStatusContentProps extends Omit<OrderStatusProps, 'statusTitle' | 'orderData' | 'status'> {
    title?: string;
    status?: StatusEnumProps;
    orderData?: OrderDataModel;
}
export interface OrderActionsProps {
    className?: string;
    orderData?: OrderDataModel;
    slots?: {
        OrderActions: SlotProps<DefaultSlotContext>;
    };
    routeCreateReturn?: (orderReturn: OrdersReturnPropsModel) => string;
    routeOnSuccess?: () => string;
    onError?: (errorInformation: UserInputErrorProps[] | string) => void;
}
export interface UseOrderStatusProps {
    orderData?: OrderDataModel;
}
export {};
