/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, HTMLAttributes } from 'preact/compat';
import { VNode } from 'preact';
export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size' | 'title'> {
    size?: 'small' | 'medium' | 'full';
    title?: VNode;
    centered?: boolean;
    onClose?: () => void;
    backgroundDim?: boolean;
    clickToDismiss?: boolean;
    escapeToDismiss?: boolean;
    showCloseButton?: boolean;
}
export declare const Modal: FunctionComponent<ModalProps>;
