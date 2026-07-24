/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
import { ShareRequisitionListByEmailError } from '../../api/shareRequisitionListByEmail';
export interface ShareRequisitionListContentProps {
    requisitionListUid: string;
    isSubmitting: boolean;
    onSubmit: (customerUids: string[]) => Promise<Array<ShareRequisitionListByEmailError> | null>;
    currentCustomerEmail?: string;
    /**
     * Called with the already-built relative share URL to allow customization (e.g. making it absolute).
     * Example: (relativeUrl) => `${window.location.origin}${relativeUrl}`
     * Falls back to using the relative URL as-is, built from the storefront path in store config.
     */
    routeSharedRequisitionList?: (relativeUrl: string) => string;
}
export declare const ShareRequisitionListContent: Container<ShareRequisitionListContentProps>;
