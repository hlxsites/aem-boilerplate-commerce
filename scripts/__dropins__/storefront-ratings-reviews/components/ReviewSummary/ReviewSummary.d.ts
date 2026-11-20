/********************************************************************
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { ProductReviewsStatsModel } from '../../data/models/index.js';
export interface ReviewSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'loading'> {
    stats?: ProductReviewsStatsModel;
    loading?: boolean;
}
export declare const ReviewSummary: FunctionComponent<ReviewSummaryProps>;
