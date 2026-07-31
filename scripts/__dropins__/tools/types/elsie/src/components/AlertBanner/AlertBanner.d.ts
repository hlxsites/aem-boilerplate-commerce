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
export interface AlertBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon' | 'action'> {
    variant: 'brand' | 'neutral' | 'success' | 'warning';
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    message: VNode;
    onDismiss: () => void;
    action?: {
        label: string;
        onClick: (event: Event) => void;
    };
}
export declare const AlertBanner: FunctionComponent<AlertBannerProps>;
