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
import { SelectedCustomizableOption } from './selected-customizable-option';
export interface PageInfo {
    currentPage: number;
    pageSize: number;
    totalPages: number;
}
export interface Wishlist {
    id: string;
    updated_at: string;
    sharing_code: string;
    items_count: number;
    items: Item[];
    page_info?: PageInfo;
}
export interface Item {
    id: string;
    quantity: number;
    description: string;
    added_at: string;
    selectedOptions: {
        uid: string;
    }[];
    enteredOptions?: {
        uid: string;
        value: string;
    }[];
    product: {
        sku: string;
    };
    customizableOptions: SelectedCustomizableOption[];
}
