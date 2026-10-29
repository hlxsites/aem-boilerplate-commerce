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
/**
 * Maps fetched products to OrderItems
 * Creates error items for products not found in the response
 * @param requestedItems - Items that were requested
 * @param products - Products returned from API
 * @returns Array of OrderItems with proper quantity set
 */
export declare const mapProductsToOrderItems: (requestedItems: OrderItemInput[], products: OrderItem[]) => OrderItem[];
