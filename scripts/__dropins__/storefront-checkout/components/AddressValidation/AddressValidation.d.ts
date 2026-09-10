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
import { AddressInput } from '../../data/models';
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface AddressValidationProps extends HTMLAttributes<HTMLDivElement> {
    busy?: boolean;
    currentAddress: AddressInput | null | undefined;
    selection: 'suggested' | 'original' | null;
    suggestedAddress: AddressInput | null;
    onSelectionChange: (selection: 'suggested' | 'original') => void;
}
export declare function formatAddressLine(address: AddressInput | null | undefined): string[];
export declare const AddressValidation: FunctionComponent<AddressValidationProps>;
