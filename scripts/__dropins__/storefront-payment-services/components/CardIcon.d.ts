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
import { IconProps } from '@dropins/tools/components';
import { CardBrand } from '../lib/creditCard.js';
export interface CardIconProps extends Omit<IconProps, "source" | "title" | "viewBox"> {
    /** Card brand. Falls back to the generic card icon when absent or unrecognized. */
    brand?: CardBrand;
}
export declare const CardIcon: ({ brand, ...restProps }: CardIconProps) => any;
