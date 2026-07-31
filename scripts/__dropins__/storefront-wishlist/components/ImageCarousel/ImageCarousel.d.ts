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
import { FunctionComponent, JSX } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { Image, ImageNodeRenderProps } from '../../../node_modules/@dropins/tools/src/components';
export interface ImageCarouselProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: any;
    images: Image[];
    imageNode?: (props: {
        defaultImageProps: ImageNodeRenderProps;
    }) => JSX.Element;
}
export declare const ImageCarousel: FunctionComponent<ImageCarouselProps>;
