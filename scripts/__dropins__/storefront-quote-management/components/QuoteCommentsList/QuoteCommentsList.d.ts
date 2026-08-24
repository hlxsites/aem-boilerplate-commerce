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
export interface QuoteCommentsListProps extends HTMLAttributes<HTMLUListElement> {
    comments: Array<{
        uid: string;
        createdAt: VNode;
        author: VNode;
        text: VNode;
        attachments?: Array<{
            name: string;
            url: string;
        }>;
    }>;
}
export declare const QuoteCommentsList: FunctionComponent<QuoteCommentsListProps>;
