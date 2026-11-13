/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2026 Adobe
 * All Rights Reserved.
 * __________________
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 */
/** Average rating as a percentage (0–100), exported by Commerce Data Export. */
export declare const RATING_SUMMARY_ATTRIBUTE = "ac_rating_summary";
/** Number of approved reviews, exported by Commerce Data Export. */
export declare const REVIEW_COUNT_ATTRIBUTE = "ac_review_count";
/** Review aggregates are stored on the parent product, not on its variants. */
export declare const REVIEW_SUMMARY_ATTRIBUTES: string[];
export interface ProductRatingModel {
    /** Average rating on a 0–5 scale. */
    rating: number;
    reviewCount: number;
}
