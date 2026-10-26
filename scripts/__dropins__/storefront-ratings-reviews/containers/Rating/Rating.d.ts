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
import { Container, SlotProps } from '@dropins/tools/lib';
import { StarRatingProps } from '../../components/StarRating/index.js';
export interface RatingSlotContext {
    mode: 'individual' | 'average';
    sku?: string;
    rating: number;
    reviewCount?: number;
    showCount: boolean;
    defaultRatingProps: StarRatingProps;
}
export interface RatingStateSlotContext {
    sku?: string;
    state: 'loading' | 'error' | 'unavailable';
}
export type RatingProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'icon'> & Pick<StarRatingProps, 'valueDisplay' | 'countDisplay' | 'layout' | 'showDivider' | 'icon'> & {
    slots?: {
        Rating?: SlotProps<RatingSlotContext>;
        Loading?: SlotProps<RatingStateSlotContext>;
        Error?: SlotProps<RatingStateSlotContext>;
        Unavailable?: SlotProps<RatingStateSlotContext>;
    };
} & ({
    mode: 'individual';
    rating: number;
    scope?: never;
    showCount?: never;
} | {
    mode: 'average';
    scope?: string;
    rating?: never;
    showCount?: boolean;
});
export declare const Rating: Container<RatingProps>;
