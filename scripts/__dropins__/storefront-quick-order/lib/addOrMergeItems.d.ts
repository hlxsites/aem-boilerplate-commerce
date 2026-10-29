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
import { OrderItem } from '../types/index.js';
export interface AddOrMergeItemsResult {
    updatedItems: OrderItem[];
    addedItems: OrderItem[];
    mergedItems: OrderItem[];
}
/**
 * Add or merge items into existing list
 * Returns updated list and information about which items were added/merged
 */
export declare const addOrMergeItems: (existingItems: OrderItem[], newItems: OrderItem[]) => AddOrMergeItemsResult;
