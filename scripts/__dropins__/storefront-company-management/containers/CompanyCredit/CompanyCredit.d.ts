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
import { GetCompanyCreditHistoryParams } from '../../types/api/getCompanyCreditHistoryParams.types';
export interface CompanyCreditProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Optional parameters for credit history filtering and pagination
     */
    creditHistoryParams?: GetCompanyCreditHistoryParams;
    /**
     * Whether to show the credit history section
     */
    showCreditHistory?: boolean;
}
export declare const CompanyCredit: Container<CompanyCreditProps>;
