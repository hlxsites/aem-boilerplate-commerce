/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2026 Adobe
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
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
import { SelectableOption, ShopperInputOption, ValuesModel } from '../../data/models/index.js';
export interface CustomizableOptionsProps extends HTMLAttributes<HTMLDivElement> {
    options: SelectableOption[];
    selectedUIDs: string[];
    currency?: string;
    locale?: string;
    onValueToggle: (uid: string, selected: boolean) => void;
    shopperInput?: ShopperInputOption[];
    enteredOptions?: ValuesModel['enteredOptions'];
    onEnteredValueChange?: (uid: string, value: string) => void;
}
export declare const CustomizableOptions: FunctionComponent<CustomizableOptionsProps>;
