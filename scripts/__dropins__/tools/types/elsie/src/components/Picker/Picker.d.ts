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
type PickerValue = string | null;
export interface PickerOption {
    value: PickerValue;
    text?: string;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    disabled?: boolean;
}
export interface PickerProps extends Omit<HTMLAttributes<HTMLSelectElement>, 'value' | 'size' | 'icon'> {
    id?: string;
    name?: string;
    value?: PickerValue;
    placeholder?: string;
    variant?: 'primary' | 'secondary';
    size?: 'medium' | 'large';
    floatingLabel?: string;
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    options?: PickerOption[];
    defaultOption?: PickerOption;
    disabled?: boolean;
    disableWhenSingle?: boolean;
    error?: boolean;
    handleSelect?: (event: Event) => void;
}
export declare const Picker: FunctionComponent<PickerProps>;
export {};
