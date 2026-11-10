/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/lib';
import { NegotiableQuoteTemplateModel } from '../../data/models/negotiable-quote-template-model';
export interface QuoteTemplateHistoryLogProps extends HTMLAttributes<HTMLDivElement> {
    templateData?: NegotiableQuoteTemplateModel;
}
export declare const QuoteTemplateHistoryLog: Container<QuoteTemplateHistoryLogProps>;
