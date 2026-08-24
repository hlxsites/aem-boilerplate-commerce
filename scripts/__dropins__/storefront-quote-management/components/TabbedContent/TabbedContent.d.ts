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
export interface TabbedContentProps extends HTMLAttributes<HTMLDivElement> {
    tabs: Map<string, string>;
    tabsContent: Map<string, VNode>;
    defaultActiveTab?: string;
}
export declare const TabbedContent: FunctionComponent<TabbedContentProps>;
