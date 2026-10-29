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
import { Initializer, Model } from '@dropins/tools/lib';
import type { UIProviderProps } from '@dropins/tools/components/UIProvider';
import { StoreConfigModel } from '../getStoreConfig';
import { ProductReviewModel, ProductReviewsModel } from '../../data/models/index.js';
type ConfigProps = Partial<StoreConfigModel> & {
    langDefinitions?: UIProviderProps['langDefinitions'];
    models?: {
        ProductReviewModel?: Model<ProductReviewModel>;
        ProductReviewsModel?: Model<ProductReviewsModel>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import("@dropins/tools/lib").Config<ConfigProps>;
export {};
