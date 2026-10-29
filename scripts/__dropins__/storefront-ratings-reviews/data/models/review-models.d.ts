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
export type ProductReviewModel = {
    nickname: string;
    summary: string;
    text: string;
    rating: number | null;
    createdAt: string;
};
export type ProductReviewsRequest = {
    sku: string;
    pageSize: number;
    currentPage: number;
};
export type ProductReviewsModel = {
    items: ProductReviewModel[];
    pageInfo: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
};
