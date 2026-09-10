/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { ActionButtonProps } from '../ActionButton';
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface ActionButtonGroupOption {
    value: string | null;
    text: string;
    icon?: VNode<SVGElement>;
    disabled?: boolean;
}
export interface ActionButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary';
    activeOption?: string;
    disabled?: boolean;
    dividers?: boolean;
    children: VNode<ActionButtonProps>[] | VNode<ActionButtonProps>;
    handleSelect?(value: string): void;
}
export declare const ActionButtonGroup: FunctionComponent<ActionButtonGroupProps>;
