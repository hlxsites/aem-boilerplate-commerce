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
export interface ToggleButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'icon' | 'label'> {
    label: string | VNode<HTMLAttributes<HTMLElement>>;
    name: string;
    value: string;
    ariaLabel?: string;
    busy?: boolean;
    disabled?: boolean;
    icon?: VNode<HTMLAttributes<SVGSVGElement>> | VNode<HTMLAttributes<HTMLImageElement>>;
    onChange?: (value: string) => void;
    selected?: boolean;
}
export declare const ToggleButton: FunctionComponent<ToggleButtonProps>;
