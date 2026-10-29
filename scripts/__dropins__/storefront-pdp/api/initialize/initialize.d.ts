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
import { Initializer } from '@dropins/tools/lib';
import { Lang } from '@dropins/tools/i18n';
import { ProductModel, Option } from '../../data/models/index.js';
export type OptionsTransformer = (options: Option[]) => Option[];
type ModelConfig = {
    initialData?: any;
    /** @deprecated Use "transformer" instead */
    transform?: (data?: ProductModel) => ProductModel;
    transformer?: (data?: ProductModel) => ProductModel;
    fallbackData?: (parentProduct: any, simpleProduct: ProductModel) => ProductModel;
};
type ProductOptionsConfig = {
    optionsTransformer?: OptionsTransformer;
};
type ConfigProps = {
    scope?: string;
    langDefinitions?: Lang;
    defaultLocale?: string;
    globalLocale?: string;
    sku?: string;
    acdl?: boolean;
    anchors?: string[];
    persistURLParams?: boolean;
    preselectFirstOption?: boolean;
    optionsUIDs?: string[];
    models?: {
        ProductDetails?: ModelConfig;
        ProductOptions?: ProductOptionsConfig;
        [name: string]: ModelConfig | ProductOptionsConfig | undefined;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import("@dropins/tools/lib").Config<ConfigProps>;
export {};
