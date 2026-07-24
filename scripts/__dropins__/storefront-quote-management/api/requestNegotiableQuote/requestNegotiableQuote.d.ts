/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';
export interface RequestNegotiableQuoteInput {
    cartId: string;
    quoteName: string;
    comment: string;
    isDraft?: boolean;
    attachments?: {
        key: string;
    }[];
}
export declare const requestNegotiableQuote: (input: RequestNegotiableQuoteInput) => Promise<NegotiableQuoteModel | null>;
