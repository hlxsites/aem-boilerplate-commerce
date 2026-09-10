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
import { GiftOptionsViewProps, GiftFormDataType } from '../../../types';
interface FormFieldsProps {
    view: GiftOptionsViewProps;
    giftOptions: GiftFormDataType;
    disabled: boolean;
    errorMessage: Record<string, string>;
    onInputChange: (value: Event) => void;
    onBlur: (event: Event) => void;
    isGiftMessageVisible: boolean;
}
export declare const FormFields: FunctionComponent<FormFieldsProps>;
export {};
