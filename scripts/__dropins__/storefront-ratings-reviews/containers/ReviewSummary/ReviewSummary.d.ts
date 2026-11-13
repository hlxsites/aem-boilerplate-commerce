/********************************************************************
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/lib';
export interface ReviewSummaryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    scope?: string;
}
export declare const ReviewSummary: Container<ReviewSummaryProps>;
