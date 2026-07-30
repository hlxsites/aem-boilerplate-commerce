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
import { FunctionComponent } from 'preact';
import { CompanyFormSlots } from '../../types/form.types';
import { Company } from '../../data/models/company';
import { InLineAlertProps } from '../../types/companyProfile.types';
export interface CompanyRegistrationFormProps {
    onSuccess?: (company: Company) => void;
    onError?: (errors: string[]) => void;
    className?: string;
    slots?: CompanyFormSlots;
    hideActionFormButtons?: boolean;
    inLineAlertProps?: InLineAlertProps;
}
export declare const CompanyRegistrationForm: FunctionComponent<CompanyRegistrationFormProps>;
