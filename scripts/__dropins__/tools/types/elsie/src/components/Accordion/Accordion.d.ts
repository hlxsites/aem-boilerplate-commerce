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
import { IconNode } from '..';
export interface AccordionSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon'> {
    defaultOpen?: boolean;
    actionIconPosition?: 'left' | 'right';
    ariaLabelTitle: string;
    iconOpen?: IconNode;
    iconClose?: IconNode;
    iconLeft?: IconNode;
    showIconLeft?: boolean;
    secondaryText?: string | VNode<HTMLAttributes<HTMLSpanElement>>;
    renderContentWhenClosed?: boolean;
    onStateChange?: (open: boolean) => void;
}
export declare const AccordionSection: FunctionComponent<AccordionSectionProps>;
export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'icon'> {
    actionIconPosition?: 'left' | 'right';
    iconOpen?: IconNode;
    iconClose?: IconNode;
    iconLeft?: IconNode;
    showIconLeft?: boolean;
    secondaryText?: string | VNode<HTMLAttributes<HTMLSpanElement>>;
    children: VNode<AccordionSectionProps>[] | VNode<AccordionSectionProps>;
}
export declare const Accordion: FunctionComponent<AccordionProps>;
