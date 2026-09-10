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
import { FunctionComponent } from 'preact';
import { GiftOptionsViewProps, GiftWrappingConfigProps, GiftFormDataType, ProductGiftOptionsConfig } from '../../../types';
import { CartModel, Item } from '../../../data/models';
import { StateUpdater, Dispatch } from 'preact/hooks';
interface CheckboxGroupProps {
    className: string;
    view: GiftOptionsViewProps;
    item: Item | ProductGiftOptionsConfig;
    giftOptions: GiftFormDataType;
    disabled: boolean;
    cartData: CartModel | null;
    giftWrappingConfig: GiftWrappingConfigProps[] | [];
    areGiftOptionsVisible: Record<string, boolean>;
    setShowModal: Dispatch<StateUpdater<boolean>>;
    onInputChange: (event: Event) => void;
}
export declare const CheckboxGroup: FunctionComponent<CheckboxGroupProps>;
export {};
