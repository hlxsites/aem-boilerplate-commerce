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
interface CompanyAccountFieldsProps {
    loading?: boolean;
    value: {
        name: string;
        email: string;
        legalName: string;
        vatTaxId: string;
        resellerId: string;
    };
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    onBlur: (field: string, value?: string) => void;
    /** Optional input name prefix for DOM names (defaults to none) */
    namePrefix?: string;
    /** Optional field path prefix used for change/blur handlers (defaults to none) */
    fieldPathPrefix?: string;
}
export declare const CompanyAccountFields: FunctionComponent<CompanyAccountFieldsProps>;
export default CompanyAccountFields;
