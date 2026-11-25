/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2024 Adobe
 * All Rights Reserved.
 * __________________
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 */
import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/lib';
import { ProductModel } from '../../data/models/index.js';
export interface ProductHeaderProps extends HTMLAttributes<HTMLDivElement> {
    scope?: string;
    hideSku?: boolean;
    /** When true, show variant SKU when all options are selected (configurable product). Default false. */
    showVariantSku?: boolean;
    /** When true, show variant name when all options are selected (configurable product). Default false. */
    showVariantName?: boolean;
}
export declare const ProductHeader: Container<ProductHeaderProps, ProductModel | null>;
