/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface RequestNegotiableQuoteFormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'title'> {
    title: VNode;
    banner?: VNode;
    commentField?: VNode;
    quoteNameField?: VNode;
    attachFile?: VNode;
    attachedFilesList?: VNode;
    requestButton?: VNode;
    saveButton?: VNode;
    onSubmit: (e: Event) => void;
}
export declare const RequestNegotiableQuoteForm: FunctionComponent<RequestNegotiableQuoteFormProps>;
