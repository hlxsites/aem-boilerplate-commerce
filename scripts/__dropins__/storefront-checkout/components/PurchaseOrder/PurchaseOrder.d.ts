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
export interface PurchaseOrderProps extends HTMLAttributes<HTMLFormElement> {
    error?: string;
    referenceNumber?: string;
    onReferenceNumberBlur?: (event: Event) => void;
    onReferenceNumberChange?: (event: Event) => void;
    onInvalidReferenceNumber?: (event: Event) => void;
}
export declare const PurchaseOrder: FunctionComponent<PurchaseOrderProps>;
