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
import { Container, SlotProps } from '@dropins/tools/lib';
import { ProductModel } from '../../data/models/index.js';
import { OptionsTransformer } from '../../api.js';
import { ImageNodeRenderProps, ImageProps } from '@dropins/tools/components';
/** @deprecated Use OptionsTransformer from @/pdp/api instead */
export type ProductOptionsTransformer = OptionsTransformer;
export interface ProductOptionsProps extends HTMLAttributes<HTMLDivElement> {
    scope?: string;
    hideSelectedValue?: boolean;
    onValues?: (optionsUIDs: string[]) => void;
    onErrors?: (errors: {
        [id: string]: string;
    }) => void;
    transformer?: ProductOptionsTransformer;
    slots?: {
        Swatches?: SlotProps<{
            data: ProductModel | null;
            optionsUIDs: string[];
        }>;
        SwatchImage?: SlotProps<{
            data: ProductModel | null;
            optionsUIDs: string[];
            imageSwatchContext: ImageNodeRenderProps['imageSwatchContext'];
            defaultImageProps: ImageProps;
        }>;
    };
}
export declare const ProductOptions: Container<ProductOptionsProps, {
    data: ProductModel | null;
    optionsUIDs: string[];
}>;
