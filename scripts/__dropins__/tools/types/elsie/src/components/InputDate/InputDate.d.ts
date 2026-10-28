/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
import { InputProps } from '..';
export interface InputDateProps extends Omit<InputProps, 'error' | 'value'> {
    label?: string;
    name?: string;
    error?: string;
    value?: string;
}
export declare const InputDate: FunctionComponent<InputDateProps>;
