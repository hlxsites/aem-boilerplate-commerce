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
import { Container } from '@dropins/tools/lib';
import { RequisitionList } from '../../data/models/requisitionList';
import { Item } from '../../data/models/item';
export interface RequisitionListHeaderProps {
    requisitionList: RequisitionList;
    routeRequisitionListGrid?: () => string | void;
    onUpdate?: (updatedList: RequisitionList) => void | Promise<void>;
    onAlert?: (payload: {
        action: string;
        type: string;
        context: string;
    }) => void;
    enrichConfigurableProducts?: (items: Item[]) => Promise<Item[]>;
    currentCustomerEmail?: string;
    routeSharedRequisitionList?: (relativeUrl: string) => string;
}
export declare const RequisitionListHeader: Container<RequisitionListHeaderProps>;
