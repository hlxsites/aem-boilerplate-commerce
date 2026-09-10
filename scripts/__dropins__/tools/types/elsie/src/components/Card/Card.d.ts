/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { ComponentChildren, FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary';
    children: ComponentChildren | ComponentChildren[];
}
export declare const Card: FunctionComponent<CardProps>;
