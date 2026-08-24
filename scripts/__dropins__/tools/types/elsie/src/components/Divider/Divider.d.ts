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
export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    variant?: 'primary' | 'secondary';
}
export declare const Divider: FunctionComponent<DividerProps>;
