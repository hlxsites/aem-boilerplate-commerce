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
export interface ActionButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'icon'> {
    children?: ComponentChildren;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    active?: boolean;
    disabled?: boolean;
}
export declare const ActionButton: FunctionComponent<ActionButtonProps>;
