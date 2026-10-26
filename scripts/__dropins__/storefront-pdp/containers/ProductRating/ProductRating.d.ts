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
import { Container } from '@dropins/tools/lib';
import { StarRatingProps } from '@dropins/tools/components';
import { ProductModel } from '../../data/models/index.js';
export interface ProductRatingProps extends Omit<StarRatingProps, 'rating' | 'reviewCount'> {
    scope?: string;
}
export declare const ProductRating: Container<ProductRatingProps, ProductModel | null>;
