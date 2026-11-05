/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { Initializer, Model } from '@dropins/tools/lib';
import { Lang } from '@dropins/tools/i18n';
import { Product } from '../../data/models/product.js';
import { ProductSearchResult } from '../../data/models/index.js';
type ConfigProps = {
    langDefinitions?: Lang;
    models?: {
        Product?: Model<Product>;
        ProductSearchResult?: Model<ProductSearchResult>;
    };
};
export declare const initialize: Initializer<ConfigProps>;
export declare const config: import("@dropins/tools/lib").Config<ConfigProps>;
export {};
