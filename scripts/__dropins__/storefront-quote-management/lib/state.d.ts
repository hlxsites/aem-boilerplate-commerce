/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { StoreConfigModel } from '../data/models';
export declare const DEFAULT_PERMISSIONS: {
    requestQuote: boolean;
    editQuote: boolean;
    deleteQuote: boolean;
    checkoutQuote: boolean;
    viewQuoteTemplates: boolean;
    manageQuoteTemplates: boolean;
    generateQuoteFromTemplate: boolean;
};
export declare const DEFAULT_CONFIG: StoreConfigModel;
export declare const state: State;
