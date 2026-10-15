/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { ProductSearchResult, Scope, SearchVariables } from '../../data/models/index.js';
type SearchOptions = {
    scope?: Scope;
};
export declare const search: (request: SearchVariables | null, options?: SearchOptions) => Promise<ProductSearchResult>;
export {};
