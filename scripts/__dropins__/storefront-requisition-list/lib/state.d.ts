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
import { RequisitionList } from '../data/models/requisitionList';
export type StoreConfig = {
    is_requisition_list_active?: string;
    company_enabled?: boolean;
    requisition_list_sharing_enabled?: boolean | string;
    requisition_list_share_max_recipients?: string | number | null;
    requisition_list_share_storefront_path?: string | null;
    configurable_thumbnail_source?: string | null;
    [key: string]: any;
};
type State = {
    authenticated: boolean;
    config: StoreConfig | undefined;
    isCompanyUser: boolean;
    requisitionLists: RequisitionList[];
    requisitionListsLoading: boolean;
    requisitionListsVersion: number;
};
export declare const state: State;
export declare const setRequisitionLists: (lists: RequisitionList[]) => void;
export declare const addRequisitionList: (list: RequisitionList) => void;
export declare const updateRequisitionList: (list: RequisitionList) => void;
export declare const getRequisitionListsFromState: () => RequisitionList[];
export declare const setRequisitionListsLoading: (loading: boolean) => void;
export {};
