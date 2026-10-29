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
import { HTMLAttributes } from 'preact/compat';
import { FunctionComponent, JSX } from 'preact';
import { ImageNodeRenderProps } from '../../../node_modules/@dropins/tools/src/components';
import { Item, Product } from '../../data/models';
export interface ProductItemProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    item?: Item;
    onCartActionButtonClick?: () => boolean;
    onTrashButtonClick?: () => boolean;
    routeProdDetailPage: (product: Product) => string;
    imageNode?: (props: {
        defaultImageProps: ImageNodeRenderProps;
    }) => JSX.Element;
}
export declare const ProductItem: FunctionComponent<ProductItemProps>;
