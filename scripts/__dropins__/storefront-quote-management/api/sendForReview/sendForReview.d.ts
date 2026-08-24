/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';
export interface SendForReviewInput {
    quoteUid: string;
    comment?: string;
    attachments?: {
        key: string;
    }[];
}
export declare const sendForReview: (input: SendForReviewInput) => Promise<NegotiableQuoteModel | null>;
