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
export interface InLineAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon'> {
    variant?: 'primary' | 'secondary';
    heading: string;
    description?: string;
    type?: 'error' | 'warning' | 'success';
    icon?: VNode<HTMLAttributes<SVGSVGElement>>;
    additionalActions?: Array<{
        label: string;
        onClick: (event: Event) => void;
        'aria-label'?: string;
    }>;
    onDismiss?: (event: Event) => void;
    itemList?: VNode;
    actionButtonPosition?: 'top' | 'bottom';
}
export declare const InLineAlert: FunctionComponent<InLineAlertProps>;
