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
import { ProductReviewsModel } from '../../data/models/index.js';
export type { ProductReviewModel, ProductReviewsModel, ProductReviewsRequest } from '../../data/models/index.js';
export type ProductReviewsOptions = {
    pageSize?: number;
    currentPage?: number;
    scope?: string;
};
export declare function getProductReviews(sku: string, { pageSize, currentPage, scope }?: ProductReviewsOptions): Promise<ProductReviewsModel | null>;
