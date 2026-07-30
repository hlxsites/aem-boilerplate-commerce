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
import { CartItemModel } from '../../data/models/negotiable-quote-model';
export interface LineItemNoteModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open: boolean;
    item: CartItemModel;
    onClose?: () => void;
    onConfirm: (note: string, quantity: number) => void;
    isSubmitting?: boolean;
    errorBanner?: VNode;
    successBanner?: VNode;
    showCloseButton?: boolean;
    readOnlyQuantity?: boolean;
}
export declare const LineItemNoteModal: FunctionComponent<LineItemNoteModalProps>;
