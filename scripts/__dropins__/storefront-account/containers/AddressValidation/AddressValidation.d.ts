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
import { Container } from '@dropins/tools/lib';
import { CustomerAddressesModel } from '../../data/models';
export interface AddressValidationProps {
    selectedAddress?: 'suggested' | 'original' | null;
    suggestedAddress: Partial<CustomerAddressesModel> | null;
    originalAddress: CustomerAddressesModel | null;
    handleSelectedAddress?: (payload: {
        selection: 'suggested' | 'original';
        address: CustomerAddressesModel | null | undefined;
    }) => void;
}
export declare const AddressValidation: Container<AddressValidationProps>;
