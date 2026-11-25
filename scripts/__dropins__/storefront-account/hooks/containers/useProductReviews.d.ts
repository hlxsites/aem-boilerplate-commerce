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
import { CustomerReviewModel, CustomerReviewsModel } from '../../data/models/customer-reviews';
import { ProductReviewsProps } from '../../types/productReviews.types';
type UseProductReviewsProps = Pick<ProductReviewsProps, 'pageSize' | 'enabled' | 'authenticated' | 'contextKey'>;
export declare const useProductReviews: ({ pageSize: initialPageSize, enabled, authenticated, contextKey, }?: UseProductReviewsProps) => {
    page: CustomerReviewsModel | null;
    pageSize: number;
    currentPage: number;
    selected: {
        key: string;
        review: CustomerReviewModel;
        index: number;
    } | null;
    loading: boolean;
    failed: boolean;
    changePage: (next: number, size?: number) => void;
    selectReview: (review: CustomerReviewModel, index: number) => void;
    clearSelection: () => void;
    retry: () => void;
};
export {};
