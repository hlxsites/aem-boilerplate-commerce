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
/**
 * @param size this is the size of the spinner ranging in [12px, 24px, 36px, 48px]
 * @param stroke this is the stroke of the spinner ranging in [1px, 2px, 3px, 4px]
 */
export interface ProgressSpinnerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    ariaLabel?: string;
    size?: 'small' | 'medium' | 'big' | 'large';
    stroke?: '1' | '2' | '3' | '4';
}
export declare const ProgressSpinner: FunctionComponent<ProgressSpinnerProps>;
