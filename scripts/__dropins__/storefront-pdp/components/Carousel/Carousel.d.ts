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
type Show = number;
export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'controls'> {
    children: VNode[] | VNode;
    thumbnails?: VNode[] | VNode;
    show?: Show | {
        small: Show;
        medium: Show;
        large: Show;
    };
    gap?: 'small' | 'medium' | 'large' | null;
    scrollbar?: boolean;
    peak?: boolean;
    arrows?: boolean;
    controls?: 'thumbnailsRow' | 'thumbnailsColumn' | 'dots' | null;
    arrowsOnMainImage?: boolean;
    loop?: boolean;
    direction?: 'horizontal';
    style?: Record<string, string | number>;
    width?: string;
    height?: string;
    defaultIndex?: number;
    infinite?: boolean;
    isZoomed?: boolean;
}
export declare const Carousel: FunctionComponent<CarouselProps>;
export {};
