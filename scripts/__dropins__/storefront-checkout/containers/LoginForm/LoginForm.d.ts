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
import { TitleProps } from '../../types';
import { Container, SlotProps } from '../../../node_modules/@dropins/tools/src/lib';
import { HTMLAttributes } from 'preact/compat';
interface ValidationError {
    email: string;
    message: string;
    type: 'missing' | 'invalid';
}
interface CartSyncError {
    email: string;
    error: Error;
}
export interface LoginFormProps extends HTMLAttributes<HTMLFormElement>, TitleProps {
    active?: boolean;
    autoSync?: boolean;
    displayHeadingContent?: boolean;
    onSignInClick?: (email: string) => void;
    onSignOutClick?: () => void;
    onCartSyncError?: (error: CartSyncError) => void;
    onValidationError?: (error: ValidationError) => void;
    slots?: {
        Heading?: SlotProps<{
            authenticated: boolean;
        }>;
        Preferences?: SlotProps<{
            email: string;
            isEmailValid: boolean;
            isAuthenticated: boolean;
        }>;
    } & TitleProps['slots'];
}
export declare const LoginForm: Container<LoginFormProps>;
export {};
