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
import { FunctionComponent, Ref } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { SlotProps } from '@dropins/tools/lib';
import { CreatedProductReviewModel, RatingMetadataModel } from '../../data/models/index.js';
export interface WriteReviewSlotContext {
    sku: string;
    state: 'ready' | 'error' | 'success' | 'signIn';
}
export interface WriteReviewSlots {
    ProductSummary?: SlotProps<WriteReviewSlotContext>;
    SignInPrompt?: SlotProps<WriteReviewSlotContext>;
    SuccessMessage?: SlotProps<WriteReviewSlotContext & {
        review: CreatedProductReviewModel;
    }>;
}
export type WriteReviewFieldName = 'title' | 'description' | 'nickname';
export interface WriteReviewComponentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSubmit'> {
    sku: string;
    state: WriteReviewSlotContext['state'];
    productName?: string;
    productImage?: {
        src: string;
        alt?: string;
    };
    categories: RatingMetadataModel[] | null;
    fields: Record<WriteReviewFieldName, string>;
    ratings: Record<string, number>;
    fieldErrors: Partial<Record<WriteReviewFieldName, boolean>>;
    ratingErrors: Record<string, boolean>;
    submitting: boolean;
    submitError: string | null;
    submitted: CreatedProductReviewModel | null;
    signInHref?: string;
    formRef?: Ref<HTMLFormElement>;
    slots?: WriteReviewSlots;
    onFieldChange: (name: WriteReviewFieldName, value: string) => void;
    onRatingChange: (id: string, value: number) => void;
    onSubmit: (event: Event) => void;
    onFormFocus?: () => void;
}
export declare const ratingInputName: (id: string) => string;
export declare const WriteReview: FunctionComponent<WriteReviewComponentProps>;
