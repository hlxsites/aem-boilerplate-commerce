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
import { ComponentChildren } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface SellerAssistedBuyingSettingsProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export interface SellerAssistedBuyingSettingsControlProps {
    loading: boolean;
    isRemoteShoppingAssistanceAvailable: boolean;
    isRemoteShoppingAssistanceEnabled: boolean;
    showAlert: boolean;
    checkboxLabel: string;
    checkboxTooltip?: string;
    alertMessage: string;
    featureDisabledMessage: string;
    handleCheckboxChange: (checked: boolean) => void;
    handleDismissAlert: () => void;
    children?: ComponentChildren;
}
export interface UseSellerAssistedBuyingSettingsReturn {
    loading: boolean;
    isRemoteShoppingAssistanceAvailable: boolean;
    isRemoteShoppingAssistanceEnabled: boolean;
    showAlert: boolean;
    handleCheckboxChange: (checked: boolean) => void;
    handleDismissAlert: () => void;
}
