/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface ColorSwatchProps extends Omit<HTMLAttributes<HTMLInputElement>, 'label' | 'size'> {
    name?: string;
    label?: string;
    groupAriaLabel?: string;
    id?: string;
    size?: 'medium' | 'large';
    color?: string;
    value?: string;
    disabled?: boolean;
    selected?: boolean;
    outOfStock?: boolean;
    multi?: boolean;
    onValue?: (value: any) => void;
    onUpdateError?: (error: Error) => void;
}
export declare const ColorSwatch: FunctionComponent<ColorSwatchProps>;
