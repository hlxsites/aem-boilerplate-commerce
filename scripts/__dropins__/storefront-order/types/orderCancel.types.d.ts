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
import { ButtonProps, PickerProps } from '@dropins/tools/src/components';
import { PickerOption } from '../../node_modules/@dropins/tools/src/components';
export interface OrderCancelProps {
    orderRef: string;
}
export interface OrderCancelFormProps {
    orderRef: string;
    pickerProps?: PickerProps;
    submitButtonProps?: ButtonProps;
    cancelReasons: PickerOption[];
}
export interface UseOrderActionsProps {
    enableOrderCancellation: boolean | undefined;
}
