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
import { ProductModel, ProductRatingModel } from '../data/models/index.js';
/**
 * Reads the review aggregates (`ac_rating_summary`, `ac_review_count`) from
 * the product attributes. Returns `null` when the product has no approved
 * reviews or the values are missing or invalid.
 */
export declare function getProductRating(data: ProductModel | null): ProductRatingModel | null;
