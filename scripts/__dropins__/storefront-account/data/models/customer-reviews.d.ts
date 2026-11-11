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
export type CustomerReviewProductModel = {
    sku: string;
    name: string;
    urlKey: string | null;
    thumbnail: {
        url: string;
        label: string;
    } | null;
};
export type CustomerReviewModel = {
    nickname: string;
    summary: string;
    text: string;
    createdAt: string;
    createdDate: string | null;
    rating: number | null;
    ratingsBreakdown: {
        name: string;
        value: number;
    }[];
    product?: CustomerReviewProductModel | null;
};
export type CustomerReviewsModel = {
    items: CustomerReviewModel[];
    pageInfo: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
};
