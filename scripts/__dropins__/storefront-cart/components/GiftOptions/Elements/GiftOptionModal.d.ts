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
import { FunctionComponent, JSX, VNode } from 'preact';
import { ImageNodeRenderProps } from '../../../../node_modules/@dropins/tools/src/components';
import { GiftWrappingConfigProps, GiftOptionsViewProps } from '../../../types';
interface GiftOptionModalProps {
    giftWrappingConfig: GiftWrappingConfigProps[];
    showModal: boolean;
    productName: string;
    view: GiftOptionsViewProps;
    imageSwatchImageNode?: VNode | ((props: ImageNodeRenderProps) => JSX.Element);
    setShowModal: () => void;
    updateGiftOptions: (name: string, value?: string | boolean | number, extraGiftOptions?: Record<string, string | boolean | number>) => void;
}
export declare const GiftOptionModal: FunctionComponent<GiftOptionModalProps>;
export {};
