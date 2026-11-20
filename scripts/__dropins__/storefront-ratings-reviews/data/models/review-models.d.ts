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
    withStats?: boolean;
};
export type ProductReviewsModel = {
    items: ProductReviewModel[];
    stats?: ProductReviewsStatsModel | null;
    pageInfo: {
        currentPage: number;
        pageSize: number;
        totalPages: number;
    };
};
export type ProductReviewsStatsModel = {
    reviewCount: number;
    ratingVotesCount: number;
    ratingSummary: number;
    ratingsDistribution: {
        value: number;
        count: number;
    }[];
};
export type RatingMetadataValueModel = {
    valueId: string;
    value: number;
};
export type RatingMetadataModel = {
    id: string;
    name: string;
    values: RatingMetadataValueModel[];
};
export type RatingSelectionModel = {
    id: string;
    valueId: string | undefined;
};
export type CreateProductReviewInput = {
    sku: string;
    nickname: string;
    summary: string;
    text: string;
    ratings: Array<{
        id: string;
        valueId: string;
    }>;
};
export type CreatedProductReviewModel = {
    nickname: string;
    summary: string;
    text: string;
    rating: number | null;
    ratingsBreakdown: Array<{
        name: string;
        value: number;
    }>;
};
