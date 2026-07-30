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
export interface RenameQuoteModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open: boolean;
    quoteName: string;
    renameReason: string;
    quoteNameError?: string;
    errorBanner?: VNode;
    successBanner?: VNode;
    showCloseButton?: boolean;
    onQuoteNameChange: (value: string) => void;
    onRenameReasonChange: (value: string) => void;
    onSave: () => void;
    onClose?: () => void;
}
export declare const RenameQuoteModal: FunctionComponent<RenameQuoteModalProps>;
