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
import { StateUpdater, Dispatch } from 'preact/hooks';
import { FunctionComponent, JSX, VNode } from 'preact';
import { ImageNodeRenderProps } from '../../../node_modules/@dropins/tools/src/components';
import { GiftWrappingConfigProps, GiftOptionsViewProps, GiftFormDataType, GiftOptionsReadOnlyViewProps, ProductGiftOptionsConfig } from '../../types';
import { CartModel, Item } from '../../data/models';
export interface GiftOptionsProps {
    readOnlyFormOrderView: GiftOptionsReadOnlyViewProps;
    cartData: CartModel | null;
    errorsField: Record<string, string>;
    isGiftMessageVisible: boolean;
    fieldsDisabled: boolean;
    loading: boolean;
    showModal: boolean;
    isEditable: boolean;
    isGiftOptionsApplied: boolean;
    updateLoading: boolean;
    areGiftOptionsVisible: Record<string, boolean>;
    view: GiftOptionsViewProps;
    giftOptions: GiftFormDataType;
    imageSwatchImageNode?: VNode | ((props: ImageNodeRenderProps) => JSX.Element);
    item: Item | ProductGiftOptionsConfig;
    giftWrappingConfig: GiftWrappingConfigProps[] | [];
    updateGiftOptions: (name: string, value?: string | boolean | number, extraGiftOptions?: Record<string, string | boolean | number>) => void;
    setShowModal: Dispatch<StateUpdater<boolean>>;
    handleFormMouseLeave: () => void;
    onInputChange: (event: Event) => void;
    onBlur: (event: Event) => void;
}
export declare const GiftOptions: FunctionComponent<GiftOptionsProps>;
