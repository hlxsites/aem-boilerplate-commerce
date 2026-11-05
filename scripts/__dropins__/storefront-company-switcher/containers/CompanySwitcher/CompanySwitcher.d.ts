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
import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/lib';
import { Company } from '../../types/company';
export interface CompanySwitcherProps extends HTMLAttributes<HTMLDivElement> {
    /** Custom aria-label for the picker */
    ariaLabel?: string;
    /** Callback function to be called when the company changes */
    onCompanyChange?: (company: Company) => void;
    /** Maximum number of companies to fetch for the picker */
    size?: number;
}
/**
 * CompanySwitcher component allows users to switch between companies they have access to.
 * It only renders when a user has access to multiple companies.
 * This is a presentational component that uses the useCompanyData hook for all business logic.
 */
export declare const CompanySwitcher: Container<CompanySwitcherProps>;
