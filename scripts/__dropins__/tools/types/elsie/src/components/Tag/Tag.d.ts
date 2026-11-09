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
export interface TagProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'icon'> {
    label?: string;
    children?: VNode | VNode[];
}
export declare const Tag: FunctionComponent<TagProps>;
