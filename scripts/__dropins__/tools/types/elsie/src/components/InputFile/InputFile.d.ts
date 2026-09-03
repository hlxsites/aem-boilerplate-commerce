/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes, InputHTMLAttributes } from 'preact/compat';
export interface InputFileProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'icon'> {
    accept?: string;
    onChange?: (event: Event) => void;
    label?: string;
    multiple?: boolean;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
}
export declare const InputFile: FunctionComponent<InputFileProps>;
