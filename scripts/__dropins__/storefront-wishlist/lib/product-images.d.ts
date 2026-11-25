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
import { Image, Product } from '../data/models';
/**
 * Builds the list of images shown for a wishlist item.
 *
 * Uses `gallery` when the product has it, showing the preview image for
 * videos. Otherwise it uses `images`.
 */
export declare const getProductImages: (product?: Pick<Product, "images" | "gallery"> | null) => Image[];
