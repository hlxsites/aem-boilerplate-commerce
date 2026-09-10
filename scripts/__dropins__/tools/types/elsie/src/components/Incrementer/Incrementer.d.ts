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
export interface IncrementerProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size'> {
    name?: string;
    size?: 'medium' | 'large';
    onValue?: (value: any) => void;
    onUpdateError?: (error: Error) => void;
    error?: boolean;
    success?: boolean;
    min?: number;
    max?: number;
    disabled?: boolean;
    maxLength?: number;
    showButtons?: boolean;
}
export declare const Incrementer: FunctionComponent<IncrementerProps>;
