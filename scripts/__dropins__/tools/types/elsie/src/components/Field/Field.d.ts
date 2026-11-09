/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    label?: string;
    error?: string;
    hint?: string;
    success?: string;
    disabled?: boolean;
    children?: VNode;
    size?: 'medium' | 'large';
}
export declare const Field: FunctionComponent<FieldProps>;
