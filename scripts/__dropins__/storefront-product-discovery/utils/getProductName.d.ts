/********************************************************************
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { Product } from '../data/models/product.js';
/**
 * Returns the HTML-decoded product name, or a fallback value when the
 * product name is not available.
 */
declare const getProductName: (product: Product, fallback?: string) => string;
export { getProductName };
