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
import { ProductRatingModel, ProductRatingRequest } from '../data/models/index.js';
import { ScopedEventState } from './useScopedEvents.js';
export type RatingEventState = ScopedEventState<ProductRatingRequest, ProductRatingModel | null>;
/** Mirrors the `rating/*` events published by `getProductRating()` for one scope. */
export declare const useRatingEvents: (scope?: string) => RatingEventState;
