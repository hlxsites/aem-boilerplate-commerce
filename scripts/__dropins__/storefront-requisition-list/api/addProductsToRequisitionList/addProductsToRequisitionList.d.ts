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
import { RequisitionList } from '../../data/models/requisitionList';
export type RequisitionListItemsInput = {
    sku: string;
    quantity: number;
    parent_sku?: string;
    selected_options?: string[];
    entered_options?: Array<{
        uid: string;
        value: string;
    }>;
};
export declare const addProductsToRequisitionList: (requisitionListUid: string, requisitionListItems: Array<RequisitionListItemsInput>) => Promise<RequisitionList | null>;
