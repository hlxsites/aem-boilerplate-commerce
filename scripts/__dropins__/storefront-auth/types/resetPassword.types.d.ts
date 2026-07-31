/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
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
import { SlotProps } from '../../node_modules/@dropins/tools/src/lib';
import { activeComponentType } from './authCombine.types';
import { InLineAlertInterface } from './notification.types';
type ResetPasswordSlotContext = {
    isLoading: boolean;
};
export interface ResetPasswordProps {
    formSize?: 'default' | 'small';
    routeSignIn?: () => string;
    onErrorCallback?: (value?: unknown) => void;
    onSuccessCallback?: () => void | Promise<void>;
    slots?: {
        Title?: SlotProps<ResetPasswordSlotContext>;
        Form?: SlotProps<ResetPasswordSlotContext>;
        Buttons?: SlotProps<ResetPasswordSlotContext>;
    };
}
export interface ResetPasswordFormProps extends ResetPasswordProps {
    setActiveComponent?: (componentName: activeComponentType) => void;
}
export interface UseResetPasswordFormProps extends Omit<ResetPasswordFormProps, 'formSize'> {
    handleSetInLineAlertProps?: (value?: InLineAlertInterface) => void;
}
export {};
