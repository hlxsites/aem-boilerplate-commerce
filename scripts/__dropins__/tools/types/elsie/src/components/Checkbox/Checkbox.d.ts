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
export interface CheckboxProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size' | 'label'> {
    name: string;
    size?: 'medium' | 'large';
    disabled?: boolean;
    error?: boolean;
    label?: string | VNode | VNode[];
    description?: string | VNode | VNode[];
}
export declare const Checkbox: FunctionComponent<CheckboxProps>;
