import { OrderItem } from '../types';

/**
 * Validates order items to determine if all items are ready for cart addition
 * @param items - Array of order items to validate
 * @returns true if all items are valid, false otherwise
 */
export declare const validateOrderItems: (items: OrderItem[]) => boolean;
/**
 * Get items that are out of stock
 * @param items - Array of order items to check
 * @returns Array of out of stock items with their names
 */
export declare const getOutOfStockItems: (items: OrderItem[]) => Array<{
    sku: string;
    name: string;
}>;
//# sourceMappingURL=validateOrderItems.d.ts.map