/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 *  the property of Adobe and its suppliers, if any. The intellectual
 *  and technical concepts contained herein are proprietary to Adobe
 *  and its suppliers and are protected by all applicable intellectual
 *  property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { OrderDataModel } from '../data/models';
export interface OrderCommentItem {
    message: string;
    timestamp: string;
}
export interface OrderCommentsComponentProps extends HTMLAttributes<HTMLDivElement> {
    /** Order-level comments from CustomerOrder.comments */
    comments?: OrderCommentItem[];
}
export interface OrderCommentsProps {
    className?: string;
    orderData?: OrderDataModel;
}
export interface UseOrderCommentsProps {
    orderData?: OrderDataModel;
}
