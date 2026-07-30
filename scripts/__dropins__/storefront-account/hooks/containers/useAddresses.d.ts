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
import { CustomerAddressesModel } from '../../data/models';
import { KeysSortOrderProps, useAddressesProps } from '../../types';
export declare const useAddresses: ({ selectShipping, selectBilling, defaultSelectAddressId, onAddressData, minifiedView, routeAddressesPage, onSuccess, }: useAddressesProps) => {
    keysSortOrder: [] | KeysSortOrderProps[];
    submitLoading: boolean;
    isModalRendered: boolean;
    isFormRendered: boolean;
    loading: boolean;
    addNewAddress: boolean;
    addressesList: CustomerAddressesModel[];
    addressId: string;
    handleRenderForm: () => void;
    handleRenderModal: () => void;
    removeAddress: () => Promise<void>;
    onCloseBtnClick: () => void;
    setEditingAddressId: (id: string) => void;
    closeNewAddressForm: () => void;
    redirectToAddressesRoute: () => void;
    handleOnSuccess: () => Promise<void>;
    handleSelectAddressOption: (event: Event, item?: {} | CustomerAddressesModel | undefined) => void;
    selectedAddressOption: string;
};
