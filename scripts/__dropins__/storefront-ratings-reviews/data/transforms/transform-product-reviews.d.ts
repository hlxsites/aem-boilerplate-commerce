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
import { CreatedProductReviewModel, ProductReviewsModel, RatingMetadataModel, RatingSelectionModel } from '../models/review-models.js';
export declare function transformProductReviews(value: unknown): ProductReviewsModel;
export declare function transformRatingsMetadata(data: unknown): RatingMetadataModel[];
export declare function transformRatingSelections(categories: RatingMetadataModel[], ratings: Record<string, number>): RatingSelectionModel[];
export declare function transformCreatedProductReview(data: unknown): CreatedProductReviewModel;
