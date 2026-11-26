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
import { ConfigurableEnricher, ListLoadContext } from '../../types/list-load';
export declare const updateRequisitionListItems: (requisitionListUid: string, requisitionListItems: Array<UpdateRequisitionListItemsInput>, pageSize: number, currentPage: number, enrichConfigurableProducts?: ConfigurableEnricher, context?: ListLoadContext) => Promise<RequisitionList | null>;
type UpdateRequisitionListItemsInput = {
    item_id: string;
    quantity?: number;
    entered_options?: Array<{
        uid: string;
        value: string;
    }>;
    selected_options?: Array<string>;
};
export {};
