/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';
export interface DuplicateQuoteInput {
    quoteUid: string;
    duplicatedQuoteUid: string;
    hasOutOfStockItems?: boolean;
}
export declare const duplicateQuote: (input: DuplicateQuoteInput) => Promise<NegotiableQuoteModel | null>;
