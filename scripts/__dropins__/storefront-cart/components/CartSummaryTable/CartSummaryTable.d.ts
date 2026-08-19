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
/**
 * CartSummaryTable is a responsive grid-based component that displays cart items in a table-like format.
 * It adapts to mobile views by switching to a stacked layout with labeled sections.
 *
 * @component
 */
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
/**
 * Represents a single row entry in the cart summary table
 * Each field accepts a VNode to allow for flexible content rendering
 */
export interface CartTableEntry {
    /** The item UID */
    uid: string;
    /** Whether the item is updating */
    updating: boolean;
    /** Whether the item has an update error */
    hasError: boolean;
    /** The product details section (typically includes image, name, and options) */
    item: VNode;
    /** The unit price of the product */
    price: VNode;
    /** The quantity selector/display */
    quantity: VNode;
    /** The total price for this line item */
    subtotal: VNode;
    /** Actions bar on the bottom of the row */
    actions: VNode;
    /** Optional undo banner for removed items */
    undoBanner?: VNode;
}
/**
 * Props for the CartSummaryTable component
 */
export interface CartSummaryTableProps extends HTMLAttributes<HTMLDivElement> {
    /** Array of cart entries to display in the table */
    entries: CartTableEntry[];
    /** Optional CSS class name for custom styling */
    className?: string;
}
/**
 * CartSummaryTable component displays cart items in a responsive grid layout
 * - Uses CSS Grid for layout with 4 columns on desktop
 * - Switches to a stacked single-column layout on mobile with labeled sections
 * - Renders each entry's content using VComponent for proper component handling
 */
export declare const CartSummaryTable: FunctionComponent<CartSummaryTableProps>;
