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
export interface TextSwatchProps extends Omit<HTMLAttributes<HTMLInputElement>, 'label'> {
    name?: string;
    label: string;
    groupAriaLabel?: string;
    value?: string;
    id: string;
    disabled?: boolean;
    selected?: boolean;
    outOfStock?: boolean;
    multi?: boolean;
    onValue?: (value: any) => void;
    onUpdateError?: (error: Error) => void;
}
export declare const TextSwatch: FunctionComponent<TextSwatchProps>;
