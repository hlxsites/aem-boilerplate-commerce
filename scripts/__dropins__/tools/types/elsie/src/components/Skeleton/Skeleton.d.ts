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
export interface SkeletonRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    fullWidth?: boolean;
    lines?: number;
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    variant?: 'heading' | 'row' | 'empty';
    multilineGap?: 'xsmall' | 'small' | 'medium' | 'big' | 'xbig';
    children?: string;
}
export declare const SkeletonRow: FunctionComponent<SkeletonRowProps>;
export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
    rowGap?: 'xsmall' | 'small' | 'medium' | 'big' | 'xbig';
}
export declare const Skeleton: FunctionComponent<SkeletonProps>;
