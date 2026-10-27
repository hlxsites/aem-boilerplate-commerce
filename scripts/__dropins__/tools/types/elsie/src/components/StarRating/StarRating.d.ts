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
import { ComponentProps, FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Icon } from '../Icon';
export interface StarRatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'icon'> {
    rating: number;
    reviewCount?: number;
    showCount?: boolean;
    valueDisplay?: 'hidden' | 'value' | 'outOfFive';
    countDisplay?: 'text' | 'parentheses';
    layout?: 'inline' | 'stacked';
    showDivider?: boolean;
    icon?: ComponentProps<typeof Icon>['source'];
}
export declare const StarRating: FunctionComponent<StarRatingProps>;
