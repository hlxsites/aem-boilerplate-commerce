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
import { GetCompanyCreditHistoryParams } from '../../types/api/getCompanyCreditHistoryParams.types';
import { CompanyCreditHistory } from '../../data/models';
/**
 * Retrieves paginated company credit transaction history.
 *
 * Returns credit operations including allocations, purchases, refunds, and manual
 * adjustments with transaction details, amounts, and running balance.
 *
 * @param params - Optional query parameters for filtering and pagination
 * @returns Promise resolving to credit history data or null if unavailable
 *
 * Returns `null` if:
 * - Company Credit is not enabled for this company
 * - User lacks permission to view credit information
 * - GraphQL query fails
 *
 * @example
 * ```typescript
 * const history = await getCompanyCreditHistory({
 *   pageSize: 10,
 *   currentPage: 1,
 *   filter: { operationType: 'PURCHASE' }
 * });
 *
 * if (history) {
 *   console.log(`Found ${history.totalCount} transactions`);
 *   history.items.forEach(item => {
 *     console.log(`${item.date}: ${item.operation} - ${item.amount}`);
 *   });
 * }
 * ```
 */
export declare const getCompanyCreditHistory: (params?: GetCompanyCreditHistoryParams) => Promise<CompanyCreditHistory | null>;
