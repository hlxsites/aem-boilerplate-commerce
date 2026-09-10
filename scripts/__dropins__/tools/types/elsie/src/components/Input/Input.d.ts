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
export interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size' | 'icon'> {
    id?: string;
    name?: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    error?: boolean;
    floatingLabel?: string;
    onUpdateError?: (error: Error) => void;
    onValue?: (value: any) => void;
    size?: 'medium' | 'large';
    success?: boolean;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    maxLength?: number;
}
export declare const Input: FunctionComponent<InputProps>;
