/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2023 Adobe
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
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes, JSX } from 'preact/compat';
import { ImageNodeRenderProps } from '@dropins/tools/components';
import type { ProductOptionSelectionMap } from '../../lib/product-option-selection.js';
export type { ProductOptionSelectionEntry as SelectionEntry, ProductOptionSelectionMap as Selection, } from '../../lib/product-option-selection.js';
declare const supportedTypes: string[];
type OptionValue = {
    id: string;
    label: string;
    inStock: boolean;
    value: string;
    selected?: boolean;
    quantity?: number;
    canEditQuantity?: boolean;
};
export type Option = {
    id: string;
    type: (typeof supportedTypes)[number];
    typename?: 'ProductViewOptionValueProduct' | 'ProductViewOptionValueSwatch' | 'ProductViewOptionValueConfiguration';
    label: string;
    required?: boolean;
    multiple?: boolean;
    items: OptionValue[];
};
export interface SwatchesProps extends HTMLAttributes<HTMLDivElement> {
    options: Array<Option>;
    hideSelectedValue?: boolean;
    disablePreselections?: boolean;
    defaultOptions?: string[];
    selectionsToUpdate?: Option[];
    onValues?: (uids: ProductOptionSelectionMap, current: string) => void;
    onErrors?: (errors: {
        [id: string]: string;
    }) => void;
    /** Per bundle option value UID quantities for selected bundle children. */
    bundleOptionQuantities?: Record<string, number>;
    onBundleOptionQuantityChange?: (optionValueId: string, quantity: number) => void;
    selectedUIDs?: string[];
    imageSwatchNode?: VNode | ((props: ImageNodeRenderProps) => JSX.Element);
}
export declare const Swatches: FunctionComponent<SwatchesProps>;
