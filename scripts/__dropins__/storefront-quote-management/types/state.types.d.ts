/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { StoreConfigModel } from '../data/models';
export type State = {
    authenticated: boolean;
    permissions: {
        requestQuote: boolean;
        editQuote: boolean;
        deleteQuote: boolean;
        checkoutQuote: boolean;
        /** Permission to view quote templates */
        viewQuoteTemplates: boolean;
        /** Permission to manage (create, edit, delete) quote templates */
        manageQuoteTemplates: boolean;
        /** Permission to generate quotes from templates */
        generateQuoteFromTemplate: boolean;
    };
    config: StoreConfigModel;
    initialized: boolean;
    quoteDataLoaded: boolean;
    quoteDataInitialized: boolean;
};
