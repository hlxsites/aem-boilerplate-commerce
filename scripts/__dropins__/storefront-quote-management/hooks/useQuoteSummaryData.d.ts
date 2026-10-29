/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { NegotiableQuoteModel } from '../data/models';
/**
 * Custom hook to manage quote summary data and loading state
 */
export declare const useQuoteSummaryData: () => {
    quoteData: NegotiableQuoteModel | undefined;
    loading: boolean;
};
