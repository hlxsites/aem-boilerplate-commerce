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
import { OrderItem, OrderItemInput } from '../types/index.js';
export interface ReplaceOrAddItemsResult {
    updatedItems: OrderItem[];
    addedItems: OrderItem[];
    replacedItems: OrderItem[];
    mergedItems: OrderItem[];
}
/**
 * Replace, merge, or add items into existing list
 * Handles three scenarios:
 * 1. Replace: When inputItem has replaceItemSku, replace item at same position
 *    - If new item already exists in list, collapse by removing replaced item and merging quantity
 * 2. Merge: When item exists, increase quantity
 * 3. Add: When item doesn't exist, add to end
 */
export declare const replaceOrAddItems: (existingItems: OrderItem[], newItems: OrderItem[], inputItems: OrderItemInput[]) => ReplaceOrAddItemsResult;
