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
import { Container } from '@dropins/tools/lib';
import { CompanyFormSlots } from '../../types/form.types';
import { Company } from '../../data/models/company';
export interface CompanyRegistrationProps {
    /** Indicates whether the current user is authenticated */
    isAuthenticated?: boolean;
    /** Callback to redirect unauthenticated users to login page */
    onRedirectLogin?: () => void;
    /** Callback to redirect to account page after successful registration or when user already has company */
    onRedirectAccount?: () => void;
    /** Callback function triggered on successful company registration */
    onSuccess?: (company: Company) => void;
    /** Callback function triggered when registration fails with error messages */
    onError?: (errors: string[]) => void;
    /** Additional CSS classes to apply to the container for custom styling */
    className?: string;
    /** Slot configuration for customizing form sections */
    slots?: CompanyFormSlots;
}
export declare const CompanyRegistration: Container<CompanyRegistrationProps>;
