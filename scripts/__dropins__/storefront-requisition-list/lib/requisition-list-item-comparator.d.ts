/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 *  the property of Adobe and its suppliers, if any. The intellectual
 *  and technical concepts contained herein are proprietary to Adobe
 *  and its suppliers and are protected by all applicable intellectual
 *  property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import { Item } from '../data/models/item';
export interface ProductLike {
    sku: string;
    selectedOptions?: string[];
}
/**
 * Compares a requisition list item to the current product context (sku + selected options).
 * Used to determine if the product is already in a requisition list for active state.
 * Default: only SKU is compared. Option UIDs are compared only when options.matchBySkuOnly is false.
 */
export declare function isMatchingRequisitionListItem(requisitionListItem: Item, product: ProductLike, options?: {
    matchBySkuOnly?: boolean;
}): boolean;
