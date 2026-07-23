/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { ComponentChildren, FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'size' | 'icon'> {
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'medium' | 'large';
    children?: ComponentChildren;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    disabled?: boolean;
    active?: boolean;
    activeChildren?: ComponentChildren;
    activeIcon?: VNode<HTMLAttributes<SVGSVGElement>>;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
}
export declare const Button: FunctionComponent<ButtonProps>;
