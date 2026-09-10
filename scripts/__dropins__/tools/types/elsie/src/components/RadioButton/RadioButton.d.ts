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
export interface RadioButtonProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size' | 'label' | 'icon'> {
    label: string | VNode<HTMLAttributes<HTMLElement>>;
    name: string;
    value: string;
    size?: 'medium' | 'large';
    checked?: boolean;
    disabled?: boolean;
    error?: boolean;
    description?: string;
    busy?: boolean;
    icon?: VNode<HTMLAttributes<SVGSVGElement>> | VNode<HTMLAttributes<HTMLImageElement>>;
}
export declare const RadioButton: FunctionComponent<RadioButtonProps>;
