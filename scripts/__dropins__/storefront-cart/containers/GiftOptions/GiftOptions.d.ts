/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
import { Item } from '../../data/models';
import { Container, SlotProps } from '../../../node_modules/@dropins/tools/src/lib';
import { GiftOptionsViewProps, GiftOptionsDataSourcesProps, GiftFormDataType, ProductGiftOptionsConfig, GiftOptionsReadOnlyViewProps } from '../../types';
import { ImageNodeRenderProps, ImageProps } from '../../../node_modules/@dropins/tools/src/components';
export interface GiftOptionsProps {
    item: Item | ProductGiftOptionsConfig;
    view?: GiftOptionsViewProps;
    readOnlyFormOrderView: GiftOptionsReadOnlyViewProps;
    dataSource?: GiftOptionsDataSourcesProps;
    isEditable?: boolean;
    initialLoading?: boolean;
    handleItemsLoading?: (uid: string, state: boolean) => void;
    handleItemsError?: (uid: string, message?: string) => void;
    onItemUpdate?: ({ item }: {
        item: Item;
    }) => void;
    onGiftOptionsChange?: (data: GiftFormDataType) => void;
    slots?: {
        SwatchImage?: SlotProps<{
            item: Item | ProductGiftOptionsConfig;
            imageSwatchContext: ImageNodeRenderProps['imageSwatchContext'];
            defaultImageProps: ImageProps;
        }>;
    };
}
export declare const GiftOptions: Container<GiftOptionsProps>;
