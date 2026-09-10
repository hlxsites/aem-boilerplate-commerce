/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { AdobeCommerceOptimizerModel } from '../../data/models';
/**
 * Fetches Adobe Commerce Optimizer data from GraphQL API
 * This function works for both authenticated and non-authenticated users
 */
export declare const getAdobeCommerceOptimizerData: () => Promise<AdobeCommerceOptimizerModel>;
