/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { NegotiableQuoteModel } from '../../data/models/negotiable-quote-model';
export interface SetLineItemNoteInput {
    quoteUid: string;
    itemUid: string;
    note: string;
    quantity?: number;
}
export declare const setLineItemNote: (input: SetLineItemNoteInput) => Promise<NegotiableQuoteModel | null>;
