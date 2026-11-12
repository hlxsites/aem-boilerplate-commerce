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
import { SlotProps } from '@dropins/tools/lib';
import { CustomerReviewModel, CustomerReviewProductModel, CustomerReviewsModel } from '../data/models/customer-reviews';
export interface ProductReviewsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    pageSize?: number;
    enabled?: boolean;
    authenticated?: boolean;
    contextKey?: string;
    withHeader?: boolean;
    minifiedView?: boolean;
    routeReviewsList?: () => string;
    routeProduct?: (product: CustomerReviewProductModel) => string | undefined;
    slots?: {
        Rating?: SlotProps<{
            review: CustomerReviewModel;
        }>;
        ReviewDetails?: SlotProps<{
            review: CustomerReviewModel;
            productUrl?: string;
        }>;
    };
}
export interface ProductReviewsWrapperProps extends Omit<ProductReviewsProps, 'contextKey'> {
    initialPageSize: number;
    page: CustomerReviewsModel | null;
    pageSize: number;
    currentPage: number;
    selected: {
        review: CustomerReviewModel;
        index: number;
    } | null;
    loading: boolean;
    failed: boolean;
    changePage: (page: number, pageSize?: number) => void;
    selectReview: (review: CustomerReviewModel, index: number) => void;
    clearSelection: () => void;
    retry: () => void;
}
