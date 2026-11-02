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
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface StarRatingInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'size'> {
    name: string;
    value?: number;
    onChange?: (value: number) => void;
    size?: 'small' | 'medium';
    disabled?: boolean;
    error?: boolean;
}
export declare const StarRatingInput: FunctionComponent<StarRatingInputProps>;
