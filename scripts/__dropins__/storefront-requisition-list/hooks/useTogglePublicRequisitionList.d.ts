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
import { RequisitionList } from '../data/models/requisitionList';
import { Item } from '../data/models/item';
export type TogglePublicRequisitionListTarget = Pick<RequisitionList, 'uid' | 'name' | 'description' | 'is_public' | 'page_info'>;
export declare function useTogglePublicRequisitionList(onSuccess: (updatedList: RequisitionList) => void, onError: () => void, enrichConfigurableProducts?: (items: Item[]) => Promise<Item[]>): (rl: TogglePublicRequisitionListTarget) => Promise<void>;
