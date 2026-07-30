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
import { CompanyModel } from '../data/models';
export interface CompanyDataProps {
    name: string;
    label: string;
    value: string;
}
export interface CompanyDataContext {
    companyData: CompanyDataProps[];
}
export interface InLineAlertProps {
    type?: 'success' | 'warning' | 'error';
    text?: string;
    icon?: any;
}
export interface CompanyProfileProps {
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
    /** Slot configuration for customizing company data display */
    slots?: {
        CompanyData?: SlotProps<CompanyDataContext & {
            Default?: any;
        }>;
    };
}
export interface CompanyProfileCardProps {
    company?: CompanyModel | null;
    slots?: {
        CompanyData?: SlotProps<CompanyDataContext & {
            Default?: any;
        }>;
    };
    showEditForm: boolean;
    handleShowEditForm: () => void;
}
export interface EditCompanyProfileProps {
    inLineAlertProps?: InLineAlertProps;
    company?: CompanyModel | null;
    loading?: boolean;
    onSubmit?: (data: Partial<CompanyModel>) => Promise<void>;
    onCancel?: () => void;
}
