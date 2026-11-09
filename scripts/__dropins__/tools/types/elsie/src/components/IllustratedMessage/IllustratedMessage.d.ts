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
export interface IllustratedMessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon' | 'action'> {
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    heading?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    message?: VNode<HTMLAttributes<HTMLElement>>;
    action?: VNode;
    variant?: 'primary' | 'secondary';
}
export declare const IllustratedMessage: FunctionComponent<IllustratedMessageProps>;
