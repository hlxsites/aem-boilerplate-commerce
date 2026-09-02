/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, VNode } from 'preact';
export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
    categories: VNode[];
    separator?: VNode<HTMLAttributes<SVGSVGElement>>;
}
export declare const Breadcrumbs: FunctionComponent<BreadcrumbsProps>;
