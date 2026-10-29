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
/**
 * Find duplicate item in the list based on multiple comparison strategies
 * Returns the index of the duplicate item, or -1 if not found
 *
 * Strategies:
 * 1. Both have variantSku - compare variants
 * 2. Existing has variantSku, new has sku - compare them
 * 3. New has variantSku, existing has sku - compare them
 * 4. Neither has variantSku - compare base SKU
 */
export declare const findDuplicateItem: (items: OrderItem[], newItem: OrderItem) => number;
/**
 * Find duplicate item excluding a specific item by ID
 * Used when checking for duplicates after an item update
 */
export declare const findDuplicateItemExcluding: (items: OrderItem[], updatedItem: OrderItem, excludeItemId: string) => number;
