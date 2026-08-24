/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { NegotiableQuoteTemplateModel } from '../../data/models/negotiable-quote-template-model';
export declare const createQuoteTemplate: (quoteId: string) => Promise<NegotiableQuoteTemplateModel | null>;
