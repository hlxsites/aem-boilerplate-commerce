/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes, InputHTMLAttributes } from 'preact/compat';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'icon'> {
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
