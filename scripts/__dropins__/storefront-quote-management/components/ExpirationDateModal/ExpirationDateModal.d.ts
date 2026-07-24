/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface ExpirationDateModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open: boolean;
    expirationDate: string;
    expirationDateError?: string;
    errorBanner?: VNode;
    successBanner?: VNode;
    showCloseButton?: boolean;
    onExpirationDateChange: (value: string) => void;
    onSave: () => void | Promise<void> | Promise<boolean>;
    onClose?: () => void;
}
export declare const ExpirationDateModal: FunctionComponent<ExpirationDateModalProps>;
