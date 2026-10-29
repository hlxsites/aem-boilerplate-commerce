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
import { CSVValidationResult } from '../types/index.js';
export interface ValidationMessages {
    emptyFile: string;
    missingColumns: string;
    extraColumns: string;
    maxRowsExceeded: string;
    skuRequired: string;
    invalidQuantity: string;
    noValidData: string;
}
/**
 * Validates CSV content and extracts SKU/quantity data
 * Handles BOM, different line endings, quoted values, and empty lines
 * @param content - Raw CSV file content
 * @param messages - Localized error messages
 * @returns Validation result with data or error
 */
export declare const validateCsvContent: (content: string, messages: ValidationMessages) => CSVValidationResult;
