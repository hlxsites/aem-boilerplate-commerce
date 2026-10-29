/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { Container, SlotProps } from '@dropins/tools/lib';
import { ProductReviewsModel } from '../../api.js';
export type ReviewPageInfo = ProductReviewsModel['pageInfo'];
export interface PaginationSlotContext {
    pageInfo: ReviewPageInfo | null;
    loading: boolean;
    disabled: boolean;
    onPageChange: (page: number) => void;
}
export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    scope?: string;
    disabled?: boolean;
    onPageChange?: (page: number) => void;
    slots?: {
        Pagination?: SlotProps<PaginationSlotContext>;
        Loading?: SlotProps<PaginationSlotContext>;
    };
}
export declare const Pagination: Container<PaginationProps>;
