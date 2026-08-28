/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { AdobeCommerceOptimizerModel } from '../models';
export interface AdobeCommerceOptimizerData {
    priceBookId: string;
}
export interface AdobeCommerceOptimizerResponse {
    data?: {
        commerceOptimizer?: AdobeCommerceOptimizerData;
    };
}
export declare const transformAdobeCommerceOptimizerData: (response: AdobeCommerceOptimizerResponse) => AdobeCommerceOptimizerModel;
