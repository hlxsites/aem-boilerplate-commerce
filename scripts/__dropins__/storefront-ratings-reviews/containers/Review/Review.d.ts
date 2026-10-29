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
import { ProductReviewsModel, ProductReviewModel } from '../../api.js';
export interface ReviewSlotContext {
    sku?: string;
    state: 'loading' | 'ready' | 'empty' | 'unavailable' | 'error';
    totalCount?: number;
    page: ProductReviewsModel | null;
    retry: () => void;
}
export interface ReviewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    scope?: string;
    totalCount?: number;
    slots?: {
        Header?: SlotProps<ReviewSlotContext & {
            title: string;
        }>;
        Status?: SlotProps<ReviewSlotContext & {
            message: string;
        }>;
        Loading?: SlotProps<ReviewSlotContext>;
        ReviewItem?: SlotProps<ReviewSlotContext & {
            review: ProductReviewModel;
            index: number;
        }>;
        Footer?: SlotProps<ReviewSlotContext>;
    };
}
export declare const Review: Container<ReviewProps>;
