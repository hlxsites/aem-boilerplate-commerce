/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
    id?: string;
    name?: string;
    disabled?: boolean;
    errorMessage?: string;
}
export declare const TextArea: FunctionComponent<TextAreaProps>;
