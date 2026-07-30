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
import { HTMLAttributes } from 'preact/compat';
export declare const COMPANY_CREATE_URL = "/customer/company/create";
export interface CompanyStructureEmptyProps extends HTMLAttributes<HTMLDivElement> {
    createCompanyAccountUrl?: string;
}
export declare const CompanyStructureEmpty: FunctionComponent<CompanyStructureEmptyProps>;
