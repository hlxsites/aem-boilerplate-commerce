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
    /**
     * When true, sets `aria-busy` on the button element to signal to AT
     * that an operation is in progress.
     */
    loading?: boolean;
    /**
     * Optional text announced to screen readers while `loading` is true.
     * When omitted, `aria-busy` alone signals the busy state to AT.
     * When provided, a persistent `LiveRegion` sibling is rendered outside
     * the button with a descriptive message (e.g. "Submitting order"),
     * which is announced regardless of where focus is.
     */
    loadingLabel?: string;
    value?: string;
}
export declare const Button: FunctionComponent<ButtonProps>;
