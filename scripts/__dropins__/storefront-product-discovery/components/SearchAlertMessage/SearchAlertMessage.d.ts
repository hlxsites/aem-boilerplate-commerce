/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface SearchAlertMessageProps extends HTMLAttributes<HTMLDivElement> {
    alertMessage?: string;
}
export declare const SearchAlertMessage: FunctionComponent<SearchAlertMessageProps>;
