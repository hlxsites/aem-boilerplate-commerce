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
import { HTMLAttributes } from 'preact/compat';
import { CarouselConfig } from '../../containers/index.js';
interface ProductCarouselConfig extends CarouselConfig {
    thumbnails: VNode[];
}
export interface ProductProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: VNode;
    breadcrumbs?: VNode;
    galleryContent?: VNode;
    infoContent?: VNode;
    productContent?: VNode;
    shortDescription?: VNode;
    description?: VNode;
    attributes?: VNode;
    images: VNode[];
    options?: VNode;
    giftCardOptions?: VNode;
    downloadableOptions?: VNode;
    customizableOptions?: VNode;
    sku?: VNode;
    price?: VNode;
    specialPrice?: VNode;
    outOfStock: boolean;
    actions?: VNode;
    quantity?: VNode;
    carouselConfig?: ProductCarouselConfig;
    zoomType?: 'zoom' | 'overlay';
    closeButton?: boolean;
}
export declare const Product: FunctionComponent<ProductProps>;
export {};
