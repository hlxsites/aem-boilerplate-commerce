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
import { StoreConfigModel } from '../data/models/store-config';
type State = {
    wishlistId: string | null;
    initializing?: boolean;
    isLoading?: boolean;
    locale?: string;
    config?: StoreConfigModel | null;
    authenticated: boolean;
    storeCode?: string;
    pageSize?: number;
    currentPage?: number;
};
export declare const state: State;
export {};
