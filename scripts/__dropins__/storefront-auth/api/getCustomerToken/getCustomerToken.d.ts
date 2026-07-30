/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
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
import { InLineAlertInterface } from '../../types';
interface getCustomerTokenProps {
    email: string;
    password: string;
    handleSetInLineAlertProps: (value?: InLineAlertInterface) => void;
    translations: Record<string, string>;
    onErrorCallback?: (value?: unknown) => void;
    apiErrorMessageOverride?: string;
}
export declare const getCustomerToken: ({ email, password, translations, onErrorCallback, handleSetInLineAlertProps, apiErrorMessageOverride, }: getCustomerTokenProps) => Promise<{
    errorMessage: string;
    displayErrorMessage: string;
    userName: string;
    userEmail: string;
}>;
export {};
