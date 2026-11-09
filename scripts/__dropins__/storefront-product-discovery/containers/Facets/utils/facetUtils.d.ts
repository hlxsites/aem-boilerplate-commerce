/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
import { SearchFacet } from '../../../data/models/api.js';
import { Product } from '../../../data/models/product.js';
declare const getFilterSelection: (facet: SearchFacet) => {
    attribute: string;
    range: {
        from: number | undefined;
        to: number | undefined;
    };
} | {
    attribute: string;
    in: string[];
} | null | undefined;
declare const getCurrencyType: (items: Product[]) => string;
declare const getBucketLabel: (bucket: any, facet: SearchFacet, currency: string | null) => any;
export { getBucketLabel, getCurrencyType, getFilterSelection };
