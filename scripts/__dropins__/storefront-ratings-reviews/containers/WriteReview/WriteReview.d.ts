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
import { HTMLAttributes } from "preact/compat";
import { Container, SlotProps } from "@dropins/tools/lib";
import { CreatedProductReviewModel, RatingMetadataModel } from "../../data/models/index.js";
export interface WriteReviewSlotContext {
    sku: string;
    state: "ready" | "error" | "success" | "signIn";
}
export interface WriteReviewProps extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "onError"> {
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
    slots?: {
        ProductSummary?: SlotProps<WriteReviewSlotContext>;
        SignInPrompt?: SlotProps<WriteReviewSlotContext>;
        SuccessMessage?: SlotProps<WriteReviewSlotContext & {
            review: CreatedProductReviewModel;
        }>;
    };
}
export interface WriteReviewInitialData {
    categories: RatingMetadataModel[] | null;
}
export declare const WriteReview: Container<WriteReviewProps, WriteReviewInitialData>;
