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
import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/lib';
import { CreatedProductReviewModel, RatingMetadataModel } from '../../data/models/index.js';
import { WriteReviewSlotContext, WriteReviewSlots } from '../../components/WriteReview/index.js';
export type { WriteReviewSlotContext };
export interface WriteReviewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onError'> {
    sku: string;
    productName?: string;
    productImage?: {
        src: string;
        alt?: string;
    };
    isAuthenticated: boolean;
    routeSignIn?: () => string;
    scope?: string;
    onSuccess?: (review: CreatedProductReviewModel) => void;
    onError?: (error: Error) => void;
    slots?: WriteReviewSlots;
}
export interface WriteReviewInitialData {
    categories: RatingMetadataModel[] | null;
}
export declare const WriteReview: Container<WriteReviewProps, WriteReviewInitialData>;
