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
import { SubmitSkuValue } from './quickOrderMultipleSku.types';
export interface QuickOrderCsvUploadProps {
    className?: string;
    routeSampleCSV?: () => string;
    onFileUpload?: (values: SubmitSkuValue) => void;
}
export interface CsvFileInputProps {
    t: Record<string, string>;
    onFileUpload: (file: File) => void;
    error: string | null;
    fileName: string | null;
    onDownloadSample: () => void;
    showSampleDownload: boolean;
    disabled?: boolean;
}
export interface UseQuickOrderCsvUploadProps {
    routeSampleCSV?: () => string;
    onFileUpload?: (values: SubmitSkuValue) => void;
}
export interface UseQuickOrderCsvUploadReturn {
    handleFileUpload: (file: File) => void;
    error: string | null;
    fileName: string | null;
    handleDownloadSample: () => void;
    showSampleDownload: boolean;
}
export interface CSVValidationResult {
    isValid: boolean;
    error?: string;
    data?: SubmitSkuValue;
}
