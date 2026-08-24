/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface ActionsBarProps extends HTMLAttributes<HTMLDivElement> {
    dropdownPlaceholder?: string;
    dropdownOptions?: {
        label: string;
        value: string;
    }[];
    dropdownValue?: string;
    handleDropdownChange?: (event: Event) => void;
    buttons?: VNode[];
}
export declare const ActionsBar: FunctionComponent<ActionsBarProps>;
