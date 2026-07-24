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
import { CartModel, Item } from '../data/models';
import { GiftWrappingConfigProps, GiftOptionsViewProps, ProductGiftOptionsConfig } from '../types';
export declare const DEFAULT_FORM_STATE: {
    recipientName: string;
    senderName: string;
    message: string;
};
export declare const DEFAULT_CHECKBOXES_STATE: {
    giftReceiptIncluded: boolean;
    printedCardIncluded: boolean;
    isGiftWrappingSelected: boolean;
};
export declare const shouldShowGiftMessage: (item: CartModel["items"][0] | ProductGiftOptionsConfig, isProductView: boolean) => boolean;
export declare const getSelectedGiftWrapping: (giftWrappingOptions: GiftWrappingConfigProps[] | []) => GiftWrappingConfigProps | undefined;
export declare const areGiftOptionsDisabled: (view: GiftOptionsViewProps, item: Item | ProductGiftOptionsConfig) => boolean;
